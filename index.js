import express from 'express'

const app = express()



//* обрабатываем ошибки, чтобы узнать статус сервера 
// * - node index.js
app.get(
  "/", (req, res) => {
    (res).status(200).json({
      message: 'working'
    })
  }
)




//* зарускаем сервер express  на порту 500
app.listen(
  500,
  ()=> console.log('Has been started')
  )
  


  