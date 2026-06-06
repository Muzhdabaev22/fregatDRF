<?php

declare(strict_types=1);

/**
 * @return array<string, string>
 */
function frigat_tg_parse_wp_config(string $path): array
{
    if (!is_readable($path)) {
        return [];
    }

    $content = file_get_contents($path);
    if ($content === false || $content === '') {
        return [];
    }

    $constants = [];
    $names = [
        'FRIGAT_TELEGRAM_BOT_TOKEN',
        'FRIGAT_TELEGRAM_FORWARD_CHAT_ID',
        'FRIGAT_TELEGRAM_WEBHOOK_SECRET',
        'FRIGAT_TELEGRAM_WEBHOOK_IP',
        'FRIGAT_TELEGRAM_PROXY',
    ];

    foreach ($names as $name) {
        $quoted = preg_quote($name, '/');
        if (preg_match(
            "/define\\s*\\(\\s*['\"]{$quoted}['\"]\\s*,\\s*['\"]([^'\"]*)['\"]\\s*\\)/",
            $content,
            $match
        )) {
            $constants[$name] = $match[1];
            continue;
        }
        if (preg_match(
            "/define\\s*\\(\\s*['\"]{$quoted}['\"]\\s*,\\s*(\\d+)\\s*\\)/",
            $content,
            $match
        )) {
            $constants[$name] = $match[1];
        }
    }

    return $constants;
}

/**
 * @param array<string, string> $constants
 * @return array{bot_token: string, forward_chat_id: string, secret_token: string, webhook_ip?: string, proxy?: string}|null
 */
function frigat_tg_config_from_constants(array $constants): ?array
{
    $token = trim($constants['FRIGAT_TELEGRAM_BOT_TOKEN'] ?? '');
    $forward = trim($constants['FRIGAT_TELEGRAM_FORWARD_CHAT_ID'] ?? '');
    $sec = trim($constants['FRIGAT_TELEGRAM_WEBHOOK_SECRET'] ?? '');

    if ($token === '' || $forward === '' || $sec === '') {
        return null;
    }

    $config = [
        'bot_token' => $token,
        'forward_chat_id' => $forward,
        'secret_token' => $sec,
    ];

    $ip = trim($constants['FRIGAT_TELEGRAM_WEBHOOK_IP'] ?? '');
    if ($ip !== '') {
        $config['webhook_ip'] = $ip;
    }

    $proxy = trim($constants['FRIGAT_TELEGRAM_PROXY'] ?? '');
    if ($proxy !== '') {
        $config['proxy'] = $proxy;
    }

    return $config;
}

/**
 * @return array{bot_token: string, forward_chat_id: string, secret_token: string, webhook_ip?: string, proxy?: string}|null
 */
function frigat_tg_config_from_env(): ?array
{
    $token = trim((string) (getenv('FRIGAT_TELEGRAM_BOT_TOKEN') ?: getenv('TELEGRAM_BOT_TOKEN') ?: ''));
    $forward = trim((string) (getenv('FRIGAT_TELEGRAM_FORWARD_CHAT_ID') ?: getenv('TELEGRAM_FORWARD_CHAT_ID') ?: ''));
    $sec = trim((string) (getenv('FRIGAT_TELEGRAM_WEBHOOK_SECRET') ?: getenv('TELEGRAM_WEBHOOK_SECRET') ?: 'external-poll'));
    if ($token === '' || $forward === '') {
        return null;
    }

    $config = [
        'bot_token' => $token,
        'forward_chat_id' => $forward,
        'secret_token' => $sec,
    ];
    $proxy = trim((string) (getenv('FRIGAT_TELEGRAM_PROXY') ?: getenv('TELEGRAM_PROXY') ?: ''));
    if ($proxy !== '') {
        $config['proxy'] = $proxy;
    }

    return $config;
}

function frigat_tg_configure_proxy(?string $proxy): void
{
    $GLOBALS['frigat_tg_http_proxy'] = ($proxy !== null && $proxy !== '') ? $proxy : null;
}

function frigat_tg_get_http_proxy(): ?string
{
    $proxy = $GLOBALS['frigat_tg_http_proxy'] ?? null;

    return is_string($proxy) && $proxy !== '' ? $proxy : null;
}

/**
 * @return array{bot_token: string, forward_chat_id: string, secret_token: string, webhook_ip?: string, proxy?: string}|null
 */
function frigat_tg_finalize_config(?array $config): ?array
{
    if ($config === null) {
        frigat_tg_configure_proxy(null);

        return null;
    }

    frigat_tg_configure_proxy($config['proxy'] ?? null);

    return $config;
}
function frigat_tg_webhook_load_config(): ?array
{
    $fromEnv = frigat_tg_config_from_env();
    if ($fromEnv !== null) {
        return frigat_tg_finalize_config($fromEnv);
    }

    foreach ([__DIR__ . '/config.local.php', __DIR__ . '/config.php'] as $candidate) {
        if (!is_readable($candidate)) {
            continue;
        }
        $cfg = require $candidate;
        if (!is_array($cfg)) {
            continue;
        }
        $token = trim((string) ($cfg['bot_token'] ?? ''));
        $forward = $cfg['forward_chat_id'] ?? '';
        $forwardStr = is_int($forward) ? (string) $forward : trim((string) $forward);
        $sec = trim((string) ($cfg['secret_token'] ?? ''));
        if ($token !== '' && $forwardStr !== '' && $sec !== '') {
            $config = [
                'bot_token' => $token,
                'forward_chat_id' => $forwardStr,
                'secret_token' => $sec,
            ];
            $ip = trim((string) ($cfg['webhook_ip'] ?? ''));
            if ($ip !== '') {
                $config['webhook_ip'] = $ip;
            }
            $proxy = trim((string) ($cfg['proxy'] ?? ''));
            if ($proxy !== '') {
                $config['proxy'] = $proxy;
            }

            return frigat_tg_finalize_config($config);
        }
    }

    foreach ([dirname(__DIR__) . '/wp-config.php', dirname(__DIR__, 2) . '/wp-config.php'] as $wpConfig) {
        $parsed = frigat_tg_config_from_constants(frigat_tg_parse_wp_config($wpConfig));
        if ($parsed !== null) {
            return frigat_tg_finalize_config($parsed);
        }
    }

    return frigat_tg_finalize_config(null);
}

function frigat_tg_incoming_secret(): string
{
    if (!empty($_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'])) {
        return (string) $_SERVER['HTTP_X_TELEGRAM_BOT_API_SECRET_TOKEN'];
    }

    if (function_exists('getallheaders')) {
        $headers = getallheaders();
        if (is_array($headers)) {
            foreach ($headers as $name => $value) {
                if (strcasecmp((string) $name, 'X-Telegram-Bot-Api-Secret-Token') === 0) {
                    return (string) $value;
                }
            }
        }
    }

    return '';
}

function frigat_tg_debug_log(string $line): void
{
    $path = __DIR__ . '/webhook-debug.log';
    @file_put_contents($path, gmdate('c') . ' ' . $line . "\n", FILE_APPEND | LOCK_EX);
}

function frigat_tg_curl_apply_common($ch, int $timeout = 25, int $connectTimeout = 20): void
{
    $opts = [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT => $timeout,
        CURLOPT_CONNECTTIMEOUT => $connectTimeout,
    ];
    if (defined('CURL_IPRESOLVE_V4')) {
        $opts[CURLOPT_IPRESOLVE] = CURL_IPRESOLVE_V4;
    }
    curl_setopt_array($ch, $opts);

    $proxy = frigat_tg_get_http_proxy();
    if ($proxy !== null) {
        curl_setopt($ch, CURLOPT_PROXY, $proxy);
    }
}

/**
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_request(string $method, array $body, string $botToken, int $timeout = 25): array
{
    $url = 'https://api.telegram.org/bot' . $botToken . '/' . $method;
    $payload = json_encode($body, JSON_UNESCAPED_UNICODE);
    if ($payload === false) {
        return ['ok' => false, 'description' => 'json_encode failed'];
    }

    $last = ['ok' => false, 'description' => 'no attempts'];
    for ($attempt = 1; $attempt <= 3; $attempt++) {
        if ($attempt > 1) {
            usleep(400000);
        }
        $last = frigat_tg_curl_json_post($url, $payload, $timeout);
        if (!empty($last['ok'])) {
            return $last;
        }
        $desc = (string) ($last['description'] ?? '');
        if ($desc !== '' && strpos($desc, 'curl:') !== 0) {
            return $last;
        }
    }

    return $last;
}

/**
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_get(string $method, string $botToken, array $query = [], int $timeout = 20): array
{
    $url = 'https://api.telegram.org/bot' . $botToken . '/' . $method;
    if ($query !== []) {
        $url .= '?' . http_build_query($query);
    }

    if (!function_exists('curl_init')) {
        return ['ok' => false, 'description' => 'curl not available'];
    }

    $ch = curl_init($url);
    if ($ch === false) {
        return ['ok' => false, 'description' => 'curl_init failed'];
    }

    curl_setopt_array($ch, [
        CURLOPT_HTTPGET => true,
    ]);
    frigat_tg_curl_apply_common($ch, $timeout, 20);
    $res = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    return frigat_tg_decode_api_response($method, $res, $code, $curlError);
}

/**
 * @param array<string, string> $fields
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_post_form(string $method, array $fields, string $botToken, int $timeout = 60): array
{
    $url = 'https://api.telegram.org/bot' . $botToken . '/' . $method;

    if (!function_exists('curl_init')) {
        return ['ok' => false, 'description' => 'curl not available'];
    }

    $ch = curl_init($url);
    if ($ch === false) {
        return ['ok' => false, 'description' => 'curl_init failed'];
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $fields,
    ]);
    frigat_tg_curl_apply_common($ch, $timeout, 20);
    $res = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    return frigat_tg_decode_api_response($method, $res, $code, $curlError);
}

/**
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_curl_json_post(string $url, string $payload, int $timeout = 20): array
{
    if (!function_exists('curl_init')) {
        $ctx = stream_context_create([
            'http' => [
                'method' => 'POST',
                'header' => "Content-Type: application/json\r\n",
                'content' => $payload,
                'timeout' => $timeout,
            ],
        ]);
        $res = @file_get_contents($url, false, $ctx);
        $code = 200;
        $curlError = $res === false ? 'file_get_contents failed' : '';

        return frigat_tg_decode_api_response('api', $res, $code, $curlError);
    }

    $ch = curl_init($url);
    if ($ch === false) {
        return ['ok' => false, 'description' => 'curl_init failed'];
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => ['Content-Type: application/json'],
        CURLOPT_POSTFIELDS => $payload,
    ]);
    frigat_tg_curl_apply_common($ch, $timeout, 20);
    $res = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    return frigat_tg_decode_api_response('api', $res, $code, $curlError);
}

/**
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_decode_api_response(string $method, mixed $res, int $code, string $curlError): array
{
    if (!is_string($res) || $res === '') {
        $msg = $curlError !== '' ? 'curl: ' . $curlError : 'empty response HTTP ' . $code;
        error_log('frigat tg: ' . $method . ' ' . $msg);

        return ['ok' => false, 'description' => $msg, 'curl_error' => $curlError, 'http_code' => $code];
    }

    $decoded = json_decode($res, true);
    if (!is_array($decoded)) {
        error_log('frigat tg: invalid JSON from ' . $method . ' HTTP ' . $code);

        return [
            'ok' => false,
            'description' => 'invalid JSON HTTP ' . $code,
            'http_code' => $code,
            'raw' => substr($res, 0, 500),
        ];
    }

    if ($code < 200 || $code >= 300 || empty($decoded['ok'])) {
        $desc = isset($decoded['description']) ? (string) $decoded['description'] : 'unknown';
        error_log('frigat tg: ' . $method . ' failed HTTP ' . $code . ': ' . $desc);
    }

    $decoded['http_code'] = $code;

    return $decoded;
}

/**
 * @return array{ok: bool, result?: mixed, description?: string, error_code?: int, curl_error?: string, http_code?: int, raw?: string}
 */
function frigat_tg_set_webhook(string $botToken, string $webhookUrl, string $secret, ?string $ipAddress = null): array
{
    $fields = [
        'url' => $webhookUrl,
        'secret_token' => $secret,
        'allowed_updates' => '["message","edited_message"]',
        'drop_pending_updates' => 'true',
    ];
    if ($ipAddress !== null && $ipAddress !== '') {
        $fields['ip_address'] = $ipAddress;
    }

    return frigat_tg_post_form('setWebhook', $fields, $botToken, 60);
}

/**
 * @param array<string, mixed> $message
 */
function frigat_tg_format_sender(array $message): string
{
    $from = $message['from'] ?? null;
    if (!is_array($from)) {
        return '';
    }

    $name = trim(((string) ($from['first_name'] ?? '')) . ' ' . ((string) ($from['last_name'] ?? '')));
    $username = trim((string) ($from['username'] ?? ''));

    if ($username !== '') {
        return $name !== '' ? $name . ' (@' . $username . ')' : '@' . $username;
    }

    if ($name !== '') {
        return $name;
    }

    $id = $from['id'] ?? null;

    return $id !== null ? 'id:' . $id : '';
}

/**
 * @param array<string, mixed> $message
 */
function frigat_tg_process_message(array $message, string $token, string $forwardId): void
{
    $fromChatId = $message['chat']['id'] ?? null;
    $replyToId = $message['message_id'] ?? null;
    if ($fromChatId === null || $replyToId === null) {
        return;
    }

    $text = trim((string) ($message['text'] ?? $message['caption'] ?? ''));

    $hasMedia = false;
    foreach (['photo', 'document', 'video', 'voice', 'audio', 'video_note', 'animation', 'sticker'] as $mediaKey) {
        if (!empty($message[$mediaKey])) {
            $hasMedia = true;
            break;
        }
    }

    if ($text === '' && !$hasMedia) {
        return;
    }

    if (!$hasMedia) {
        $sender = frigat_tg_format_sender($message);
        if ($sender !== '') {
            $text = $sender . "\n\n" . $text;
        }
    }

    if ($hasMedia) {
        $sendForward = frigat_tg_request('forwardMessage', [
            'chat_id' => $forwardId,
            'from_chat_id' => $fromChatId,
            'message_id' => $replyToId,
        ], $token);
    } else {
        $sendForward = frigat_tg_request('sendMessage', [
            'chat_id' => $forwardId,
            'text' => $text,
        ], $token);
    }

    if (empty($sendForward['ok'])) {
        $desc = (string) ($sendForward['description'] ?? 'unknown');
        frigat_tg_debug_log('forward failed chat=' . $fromChatId . ' forward_to=' . $forwardId . ' err=' . $desc);
        frigat_tg_request('sendMessage', [
            'chat_id' => $fromChatId,
            'reply_to_message_id' => $replyToId,
            'text' => 'Не удалось доставить сообщение. Попробуйте позже.',
        ], $token);
        return;
    }

    $reply = frigat_tg_request('sendMessage', [
        'chat_id' => $fromChatId,
        'reply_to_message_id' => $replyToId,
        'text' => 'Сообщение отправлено.',
    ], $token);

    if (empty($reply['ok'])) {
        $desc = (string) ($reply['description'] ?? 'unknown');
        frigat_tg_debug_log('reply failed chat=' . $fromChatId . ' err=' . $desc);
    }
}

/**
 * @return array{http_code: int, body: string, time: float}|null
 */
function frigat_tg_http_post_json(string $url, array $headers, string $jsonBody): ?array
{
    if (!function_exists('curl_init')) {
        return null;
    }

    $started = microtime(true);
    $ch = curl_init($url);
    if ($ch === false) {
        return null;
    }

    $headerLines = ['Content-Type: application/json'];
    foreach ($headers as $name => $value) {
        $headerLines[] = $name . ': ' . $value;
    }

    curl_setopt_array($ch, [
        CURLOPT_POST => true,
        CURLOPT_HTTPHEADER => $headerLines,
        CURLOPT_POSTFIELDS => $jsonBody,
    ]);
    frigat_tg_curl_apply_common($ch, 25, 20);
    $body = curl_exec($ch);
    $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if (!is_string($body)) {
        return null;
    }

    return [
        'http_code' => $code,
        'body' => $body,
        'time' => microtime(true) - $started,
    ];
}
