# SCSS Стили - Документация

## Структура файлов

```
styles/
├── _vars.scss          # Переменные (цвета, размеры, шрифты)
├── _mixins.scss        # Миксины для переиспользования
├── _forms.scss         # Общие стили для форм
├── global.scss         # Глобальные стили
└── README.md           # Эта документация
```

## Переменные (_vars.scss)

### Цвета
```scss
$yellow-color: #FAE300;
$brown-font-color: #875216;
$pink-color: #f8abbf;
$light-yellow: #fae3008c;
$form-bg: #fafee7;
$checkbox-bg: #f9f985;
$button-yellow: #FEEB8F;
$button-brown: #996632;
```

### Размеры и отступы
```scss
$spacing-xs: 5px;
$spacing-sm: 10px;
$spacing-md: 15px;
$spacing-lg: 20px;
$spacing-xl: 30px;
$spacing-xxl: 40px;

$border-radius-sm: 10px;
$border-radius-md: 20px;
$border-radius-lg: 80px;
$border-radius-xl: 100px;

$font-size-sm: 14px;
$font-size-md: 18px;
$font-size-lg: 19px;
```

### Z-index значения
```scss
$z-index-base: 1;
$z-index-nav: 999;
$z-index-header: 1000;
$z-index-nav-list: 1001;
$z-index-form: 9999;
$z-index-modal: 100000;
```

## Миксины (_mixins.scss)

### Кнопки
```scss
@include button-base; // Базовые стили кнопки
@include button-variant($bg-color, $text-color, $hover-bg, $hover-text);
```

### Инпуты
```scss
@include input-base; // Базовые стили инпута
```

### Формы
```scss
@include form-container; // Контейнер формы
```

### Hover эффекты
```scss
@include hover-line($margin-top, $height, $width, $margin-left);
@include linehover-mixin; // Стандартный hover эффект
```

### Анимации
```scss
@include fade-animation; // Анимация появления
@include scale-transform($scale); // Трансформация масштаба
```

## Общие стили форм (_forms.scss)

### Классы для использования
```scss
.form-container          // Контейнер формы
.form-title             // Заголовок формы
.form-input             // Основной инпут
.form-input-secondary   // Вторичный инпут
.form-button            // Основная кнопка
.form-button-secondary  // Вторичная кнопка
.form-mail              // Блок с почтой
.form-mail-text         // Текст почты
.form-social            // Социальные иконки
.checkbox-line          // Линия с чекбоксом
.checkbox-label         // Лейбл чекбокса
.success-notification   // Уведомление об успехе
.error-notification     // Уведомление об ошибке
.error-message          // Сообщение об ошибке
```

## Примеры использования

### Создание кнопки
```scss
.my-button {
    @include button-base;
    @include button-variant($yellow-color, $brown-font-color, $pink-color, white);
    padding: $spacing-md $spacing-lg;
}
```

### Создание инпута
```scss
.my-input {
    @include input-base;
    width: 100%;
    margin-bottom: $spacing-md;
}
```

### Создание hover линии
```scss
.hover-element {
    @include hover-line(-10px, 15px, 100px, -2px);
}
```

## Преимущества оптимизации

1. **Устранение дублирования** - общие стили вынесены в миксины и классы
2. **Консистентность** - использование переменных для размеров и цветов
3. **Поддерживаемость** - изменения в одном месте применяются везде
4. **Читаемость** - понятные имена переменных и миксинов
5. **Масштабируемость** - легко добавлять новые стили

## Рекомендации

1. Всегда используйте переменные вместо магических чисел
2. Применяйте миксины для повторяющихся паттернов
3. Используйте общие классы из `_forms.scss` для форм
4. Следуйте принципу DRY (Don't Repeat Yourself)
5. Документируйте новые миксины и переменные 