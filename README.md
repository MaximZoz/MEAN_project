## 4.5 Создание категорий

#### реализовываем метод создания новой категории в методе create

controllers\category.js => module.exports.create =>

- const category

#### реализовываем возможность загружать картинки с сервера

app.js => app.use("/uploads") =>

- express.static("uploads")

#### реализовываем метод метод обновления категории в методе update

controllers\category.js => module.exports.update =>

- const updated
- const category
