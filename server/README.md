Для запуска проекта нужно установить зависимости и выполнить
npm start

Аутентификация работает пока что только с захардкоженными учетками

Например если выполнить запрос без токена, то получим ошибку
$ curl https://korgeflus1.fvds.ru/api/auth/profile
{"statusCode":401,"message":"Unauthorized"}

Токен можно получить этой командой
$ curl -X POST https://korgeflus1.fvds.ru/api/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}

А ниже пример вызова приватного метода
$ curl https://korgeflus1.fvds.ru/api/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
{"sub":1,"username":"john","iat":...,"exp":...}

Зарегистрировать пользователя можно командой
$ curl -X POST https://korgeflus1.fvds.ru/api/auth/signup -d '{"username": "NEWUSER", "password": "NEWPASSWORD"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}