const jwt = require('jsonwebtoken')
const User = require('../models/user')
const { SECRET } = require('./config')

const tokenExtractor = async (req, res, next) => {
  const authorization = req.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = jwt.verify(authorization.substring(7), SECRET)
    req.user = await User.findById(token.id)
  } else {
    req.user = null
  }
  next()
}

module.exports = {
  tokenExtractor
}
