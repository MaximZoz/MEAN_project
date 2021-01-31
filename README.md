## 4.4 Конфигурация загрузки файлов

#### устанавливаем пакеты multer и moment, которыеотвечает за загрузку файлов и работу с данными

npm i multer moment

#### реализовываем функционал, который позволяет загружать картинки в методе create

middleware\upload.js =>

- storage
- fileFilter
- limits
- module.exports = multer

#### папка для загрузок, gitkeep - чтобы она не удалялась гитом

\uploads => gitkeep
