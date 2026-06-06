<?php

/**
 * Polling вместо webhook — для reg.ru, если из webhook.php нет доступа к api.telegram.org.
 *
 * 1) Откройте один раз:
 *    .../poll.php?key=ВАШ_СЕКРЕТ&setup=1
 * 2) Cron каждую минуту (панель reg.ru → Cron):
 *    curl -sS 'https://frigateschool.ru/telegram-forward-bot/poll.php?key=ВАШ_СЕКРЕТ'
 */

declare(strict_types=1);

require __DIR__ . '/bootstrap.php';

$isCli = PHP_SAPI === 'cli';
if (!$isCli) {
    header('Content-Type: text/plain; charset=utf-8');
}

$config = frigat_tg_webhook_load_config();
if ($config === null) {
    echo "Missing config\n";
    exit(1);
}

$key = $isCli ? ($argv[1] ?? '') : (string) ($_GET['key'] ?? '');
if (!$isCli && ($key === '' || !hash_equals($config['secret_token'], $key))) {
    http_response_code(403);
    echo "Forbidden: ?key=FRIGAT_TELEGRAM_WEBHOOK_SECRET\n";
    exit(1);
}

$token = $config['bot_token'];
$forwardId = $config['forward_chat_id'];
$stateFile = __DIR__ . '/poll-state.json';

/** @var array{offset?: int, webhook_deleted?: bool, process_after?: int} */
$state = [];
if (is_readable($stateFile)) {
    $raw = file_get_contents($stateFile);
    if (is_string($raw)) {
        $decoded = json_decode($raw, true);
        if (is_array($decoded)) {
            $state = $decoded;
        }
    }
}

$setup = $isCli ? in_array('--setup', $argv, true) : (((string) ($_GET['setup'] ?? '')) === '1');
$fresh = $isCli && in_array('--fresh', $argv, true);

if ($setup || $fresh) {
    $state['process_after'] = time();
    if ($setup) {
        $state['offset'] = 0;
        unset($state['webhook_deleted']);
    }
    echo '→ process_after=' . $state['process_after'] . " (only new messages)\n";
} elseif (!isset($state['process_after'])) {
    $state['process_after'] = time();
    echo '→ process_after=' . $state['process_after'] . " (skip backlog)\n";
}

$processAfter = (int) ($state['process_after'] ?? 0);

// CLI (GitHub Actions): всегда снимаем webhook — иначе getUpdates пустой.
$mustDeleteWebhook = $isCli || $setup || empty($state['webhook_deleted']);

if ($mustDeleteWebhook) {
    $info = frigat_tg_get('getWebhookInfo', $token);
    $webhookUrl = is_array($info['result'] ?? null) ? (string) ($info['result']['url'] ?? '') : '';
    echo '→ getWebhookInfo url=' . ($webhookUrl !== '' ? $webhookUrl : '(none)') . "\n";

    echo "→ deleteWebhook (polling)\n";
    $deleteQuery = $setup ? ['drop_pending_updates' => 'true'] : [];
    $deleted = frigat_tg_get('deleteWebhook', $token, $deleteQuery);
    echo json_encode($deleted, JSON_UNESCAPED_UNICODE) . "\n";
    $state['webhook_deleted'] = !empty($deleted['ok']);

    if ($webhookUrl !== '' && empty($deleted['ok'])) {
        echo "WARN: webhook не снят — getUpdates не получит сообщения\n";
    }
}

$offset = (int) ($state['offset'] ?? 0);
echo "→ getUpdates offset={$offset}\n";

$updates = frigat_tg_request('getUpdates', [
    'offset' => $offset,
    'timeout' => 0,
    'limit' => 50,
    'allowed_updates' => ['message', 'edited_message'],
], $token, 30);

if (empty($updates['ok'])) {
    echo json_encode($updates, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT) . "\n";
    frigat_tg_debug_log('poll getUpdates failed: ' . ($updates['description'] ?? 'unknown'));
    exit(1);
}

$items = $updates['result'] ?? [];
if (!is_array($items)) {
    $items = [];
}

echo 'updates_received=' . count($items) . " process_after={$processAfter}\n";

$processed = 0;
$skippedBacklog = 0;
foreach ($items as $item) {
    if (!is_array($item)) {
        continue;
    }
    $updateId = (int) ($item['update_id'] ?? 0);
    if ($updateId > 0) {
        $offset = $updateId + 1;
    }
    $message = $item['message'] ?? $item['edited_message'] ?? null;
    if (!is_array($message)) {
        continue;
    }
    $msgDate = (int) ($message['edit_date'] ?? $message['date'] ?? 0);
    if ($processAfter > 0 && $msgDate > 0 && $msgDate < $processAfter) {
        $skippedBacklog++;
        continue;
    }
    frigat_tg_debug_log('poll update=' . $updateId . ' chat=' . ($message['chat']['id'] ?? '?'));
    frigat_tg_process_message($message, $token, $forwardId);
    $processed++;
}

$state['offset'] = $offset;
$state['process_after'] = $processAfter;
file_put_contents($stateFile, json_encode($state, JSON_UNESCAPED_UNICODE | JSON_PRETTY_PRINT));

echo "processed={$processed} skipped_backlog={$skippedBacklog} next_offset={$offset}\n";
echo "OK\n";
