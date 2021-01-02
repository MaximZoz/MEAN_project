## 3.3 Создание пользователя

#### создаём пользователя и сохраняем логин и пароль

controllers\auth.js => module.exports.register =>

- const user

#### скачиваем пакет, который позволит нам шфровать пароли (bcryptJS)

- npm i bcryptjs

#### создаём хеш, который будет уникальным для донного пароля

controllers\auth.js => module.exports.register =>

- const salt

#### добавляем хеш к паролю от клиента

controllers\auth.js => module.exports.register => const user

- password: bcrypt.hashSync(password, salt)
