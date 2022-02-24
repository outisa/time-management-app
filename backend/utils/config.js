require('dotenv').config()

let MONGODB_URI = ''
if (process.env.NODE_ENV === 'production') {
  MONGODB_URI = process.env.MONGODB_URI_PROD
} else if (process.env.NODE_ENV === 'development') {
  MONGODB_URI = process.env.MONGODB_URI_DEV
} else if (process.env.NODE_ENV === 'test') {
  MONGODB_URI = process.env.MONGODB_URI_TEST
}
const SECRET = process.env.SECRET
const PORT = process.env.PORT || 3001

module.exports = {
  MONGODB_URI,
  SECRET,
  PORT
}