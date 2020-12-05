## 2.9 Подключение mongodb

#### устанавливаем пакет mongoose

- npm i mongoose

#### подключаем mongoose к mongoDB

app.js =>

- mongoose.connect("").then(() => console.log("MongoDB connected")).catch((error) => console.log(error))

#### создаём файл конфигурации в котором будем хранить ключи и помещаем туда URI MongoDB

config\keys.js =>

- module.exports = {mongoURI:"mongodb+srv://Zozulya:Zozulya39@cluster0.bkrqc.mongodb.net/Zozulya?retryWrites=true&w=majority"}

#### подключаем MongoDB к приложению

app.js =>

- mongoose.connect(keys.mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })


