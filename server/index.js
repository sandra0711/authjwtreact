require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()

const userRouter = require('./src/router/user-router')
const errorMiddleware = require('./src/middleware/error-middleware')

const start = async () => {
  const DB_URL = process.env.DB_URL
  const PORT = process.env.PORT || 5000
  try {
    await mongoose.connect(DB_URL, { useNewUrlParser: true }, () => console.log('Подключились к базе данных'))
    app.listen(PORT, () => console.log(`Сервер запущен по адресу ${PORT}`))
  } catch (e) {
    console.log(e);
  }
}

app.use(express.json())
app.use(cors({
  credential: true,
  origin: process.env.CLIENT_URL,
}
))
app.use(cookieParser())

app.use('/user', userRouter)

app.use(errorMiddleware)

start()
