## 2.6 Парсинг данных пользователя

## дорабатываем роут логина

#### устанавливаем пакет body-parser для того, чтобы сервер понимал наши запросы

- npm i body-parser

#### подключаем пакет body-parser

app.js =>

- app.use(bodyParser.urlencoded({extended: true}))
- app.use(bodyParser.json())

#### проверяем req и res на удалённом сервисе postman

- https://web.postman.co/workspace/0c85ea99-fe8e-49d8-8ae6-9254e6d73f5b/request/create?requestId=ca19626b-c3a5-4d9c-ac67-2b64725b5edc
