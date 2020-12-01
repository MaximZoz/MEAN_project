## 2.7 Подключение утилит

#### подключаем доп пакеты cors и морган

app.js =>

- app.use(morgan("dev"))
- app.use(cors())
- npm i cors morgan

#### при запросе post в node появляются данные по роутам

- POST /api/auth/login 200 73.414 ms - 61
