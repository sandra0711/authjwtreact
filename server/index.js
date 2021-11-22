require('dotenv').config()

const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose')

const app = express()

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
app.use(cors())
app.use(cookieParser())

start()
