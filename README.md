## 4.6 Функционал заказов

#### защищаем роуты

routes\order.js =>

- passport.authenticate

## реализовываем метод create

controllers\order.js => module.exports.create =>

- const order

#### получаем данные последних заказов из базы и сортируем их в порядке убывания

controllers\order.js => module.exports.create =>

- lastOrder

## реализовываем метод getAll

controllers\order.js => module.exports.getAll =>

- const query

#### сортируем данные всех заказов в порядке убывания по дате

controllers\order.js => module.exports.getAll =>

- if (req.query.start)
- if (req.query.end)
- if (req.query.order)
