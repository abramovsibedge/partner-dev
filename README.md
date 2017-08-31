# Инструкция по работе

## Процесс разработки

Для старта окружения разработчика необходимо выполнить команды:
1. `npm install` для установки зависимостей
2. `npm run start` для запуска сервера, который будет работать на хосте `localhost:3000`

Вся разработка должна происходить в ветке *develop*.

## Публикация для теста

Проект можно протестировать в окружении *firebase* по адресу https://partner-dev-88932.firebaseapp.com/

Для публикации необходимо выполнить команды **из ветки develop**:

Если у вас нет *firebase* локально:

* `npm install -g firebase-tools` для установки *firebase* на рабочем ПК
* `firebase init` для инициализации *firebase*:
    * Are you ready to pwoceed? > Y
    * Which Firebase CLI features do you want to setup for this folder? > Hosting
    * Убедитесь что файл `.firebaserc` в корне сайта имеет следующее содержимое:
    ```
    {
      "projects": {
        "default": "partner-dev-88932"
      }
    }
    ```
    * Убедитесь что файл `firebase.json` в корне сайта имеет следующее содержимое:
    ```
    {
     "hosting": {
       "public": "build",
       "cleanUrls": true,
       "trailingSlash": false
     }
    }
    ```
* `npm run deploy` для запуска процесса публикации

Если *firebase* уже уставновлен и инициализирован, достаточно выполнить команду `npm run deploy`.

## Публикация на production

Production окружение располагается по адресу https://developer.anchorfree.com/.

Для публикации необходимо выполнить команды **из ветки production**:

Если у вас нет *firebase* локально:

* `npm install -g firebase-tools` для установки *firebase* на рабочем ПК
* `firebase init` для инициализации *firebase*:
    * Are you ready to pwoceed? > Y
    * Which Firebase CLI features do you want to setup for this folder? > Hosting
    * Убедитесь что файл `.firebaserc` в корне сайта имеет следующее содержимое:
    ```
    {
      "projects": {
        "default": "web-portal-for-partners"
      }
    }
    ```
    * Убедитесь что файл `firebase.json` в корне сайта имеет следующее содержимое:
    ```
    {
     "hosting": {
       "public": "build",
       "cleanUrls": true,
       "trailingSlash": false
     }
    }
    ```
* `npm run deploy` для запуска процесса публикации

Если *firebase* уже уставновлен и инициализирован, достаточно выполнить команду `npm run deploy`.