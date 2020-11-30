const express = require('express')
const authRoutes = require('./routes/auth')
const app = express()

//*  http://localhost:5000/api/auth/login
app.use(
  '/api/auth', authRoutes
)






module.exports =  app 
