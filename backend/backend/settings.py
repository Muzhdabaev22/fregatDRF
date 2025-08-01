from pathlib import Path
import os
from dotenv import load_dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

load_dotenv()

SECRET_KEY = os.getenv('SECRET_KEY')

DEBUG = True

ALLOWED_HOSTS = []

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'home',
    'crm',
    'rest_framework',   
    'django_ckeditor_5'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'backend.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'backend.wsgi.application'

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': os.getenv('NAME_DB'),            
        'USER': os.getenv('USER_DB'),          
        'PASSWORD': os.getenv('PASSWORD_DB'),       
        'HOST': os.getenv('HOST_DB'),              
        'PORT': os.getenv('PORT_DB'),  
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/5.2/topics/i18n/

LANGUAGE_CODE = 'ru'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.2/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'static'

MEDIA_URL = '/media/'
MEDIA_ROOT = BASE_DIR / 'media'


# Default primary key field type
# https://docs.djangoproject.com/en/5.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


customColorPalette = [
    { 'color': 'hsl(4, 90%, 58%)', 'label': 'Red' },
    { 'color': 'hsl(340, 82%, 52%)', 'label': 'Pink' },
    { 'color': 'hsl(291, 64%, 42%)', 'label': 'Purple' },
    { 'color': 'hsl(262, 52%, 47%)', 'label': 'Deep Purple' },
    { 'color': 'hsl(231, 48%, 48%)', 'label': 'Indigo' },
    { 'color': 'hsl(207, 90%, 54%)', 'label': 'Blue' },
    { 'color': 'hsl(0, 0%, 0%)', 'label': 'Black' }
]

CKEDITOR_5_CONFIGS = {
    'default': {
        'toolbar': {
            'items': [
                'heading', '|',
                'bold', 'italic', 'underline', 'strikethrough', '|',
                'fontColor',  # ← Цвет шрифта
                'link', 'bulletedList', 'numberedList', 'blockQuote', '|',
                'undo', 'redo'
            ]
        },
        'fontColor': {
            'colors': customColorPalette,
        },
    },
    'extends': {
        'fontColor': {
            'colors': customColorPalette,
        },
        'toolbar': {
            'items': [
                'heading', '|',
                'bold', 'italic', 'underline', 'strikethrough', '|',
                'fontColor', 'fontSize', 'fontFamily', '|',
                'link', 'bulletedList', 'numberedList', 'todoList', 'blockQuote', '|',
                'codeBlock', 'sourceEditing', 'insertImage', '|',
                'mediaEmbed', 'removeFormat', 'insertTable', '|',
                'undo', 'redo'
            ]
        },
    }
}

REST_FRAMEWORK = {
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 2
}