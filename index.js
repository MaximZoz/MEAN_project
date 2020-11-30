const app  = require('./app')
const port = process.env.PORT || 5000

//* запускаем сервер express  на порту 5000

app.listen(
  port,
  ()=> console.log(`Has been started on ${port}`)
  )
  
