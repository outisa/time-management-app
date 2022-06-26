const express = require('express')
require('express-async-errors')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const userRouter = require('./routers/user')
const projectRouter = require('./routers/project')
const middleware = require('./utils/middleware')

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

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
app.use('/api/projects', projectRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app