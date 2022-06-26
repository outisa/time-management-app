const bcrypt = require('bcrypt')
const userRouter = require('express').Router()
const User = require('../models/user')
const { SECRET } = require('./../utils/config')
const jwt = require('jsonwebtoken')

router.get('/accountinfo', tokenExtractor, async (req, res) => {
  const userInfo = await User.findById(req.user.id).populate('projects')
  res.json(userInfo)
})

userRouter.post('/login', async (request, response) => {
  const body = request.body
  const user = await User.findOne({ username: body.username })

  const passwordCorrect = user
    ? await bcrypt.compare(body.password, user.passwordHash)
    : false

  if (!passwordCorrect){
    return response.status(400).json({ error: 'Invalid username or password.' })
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, SECRET, { expiresIn: 60*60*24 })
  response.status(200).send({
    token,
    username: user.username,
  })
})

userRouter.post('/', async (request, response) => {
  const body = request.body

  if (!body.password || body.password.length < 10 || body.password.length > 100) {
    return response.status(400)
      .json({ error: 'Password length must be between 10 and 100 characters.' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(body.password, saltRounds)

  const user = new User({
    username: body.username,
    email: body.email,
    passwordHash
  })

  await user.save()
  response.status(200).send()
})

module.exports = userRouter