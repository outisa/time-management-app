const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userRouter = require('./routers/user')

app.use(cors())
app.use(express.json())

let url = config.MONGODB_URI

mongoose.connect(url)
  .then(() => {
    console.log('Successfully connected to MongoDB')
  })
  .catch((error) => {
    console.log('An error occured while connecting to MongoDB:', error.message)
  })
if (process.env.NODE_ENV === 'test') {
  const testingRouter = require('./routers/reset')
  app.use('/api/testing', testingRouter)
}
app.use('/api/user', userRouter)



module.exports = app