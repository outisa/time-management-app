const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')

userRouter.post('/register', async (request, response) => {
  const body = request.body
  console.log(body)
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash
  })
  try {
    await user.save()
    response.status(200).send()
  } catch (error) {
    return response.status(400).json({ error: error.message })
  }
})

module.exports = userRouter