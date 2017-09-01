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
    * Are you ready to proceed? > Y
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
    * Are you ready to proceed? > Y
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
* Перенести изменения из ветки **developer** в ветку **production**, разрешить все конфликты и убедиться в ее работоспособности запуском команды ```npm run start``` или ```npm run build```
* `npm run deploy` для запуска процесса публикации

Если *firebase* уже уставновлен и инициализирован, достаточно выполнить команды: 
* Перенести изменения из ветки **developer** в ветку **production**, разрешить все конфликты и убедиться в ее работоспособности запуском команды ```npm run start``` или ```npm run build```
* `npm run deploy` для запуска процесса публикации

## Откат изменений на production

В случае,если есть потребность откатить изменения на production до определенной версии, тонеобходимо выполнить следующее:
1. В консоли *firebase* открыть проект **WEB Portal for Partners**
2. В левой панели перейти по ссылке **Hosting**
3. В главном окне будет отображен перечень публикаций на хостинг, который выглядить как список.
4. Необходимо выбрать определенную версию, навести на нее мышкой и в правой части элемента списка появится меню, состоящее из 3х точек.
5. Кликнуть по меню и выбрать пункт **Rollback**