Для запуска проекта нужно установить зависимости и выполнить
npm start

Аутентификация работает пока что только с захардкоженными учетками

Например если выполнить запрос без токена, то получим ошибку
$ curl http://188.120.230.71:8080/auth/profile
{"statusCode":401,"message":"Unauthorized"}

Токен можно получить этой командой
$ curl -X POST http://188.120.230.71:8080/auth/login -d '{"username": "john", "password": "changeme"}' -H "Content-Type: application/json"
{"access_token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."}

А ниже пример вызова приватного метода
$ curl http://188.120.230.71:8080/auth/profile -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2Vybm..."
{"sub":1,"username":"john","iat":...,"exp":...}
