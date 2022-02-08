const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    minlength: [4, 'Username should be between 4 and 10 characters long.'],
    maxlength: [10, 'Username should be between 4 and 10 characters long.'],
    unique: [true, 'Username should be unique.'],
    required: [true, 'Username is required.']
  },
  email: {
    type: String,
    validate: {
      validator: (emailAddress) => {
        return /\S+@\S+/.test(emailAddress)
      },
      message: 'Check that the typed email address is valid.'
    },
    required: [true, 'A valid email address is required.'],
    unique: [true, 'Email should be unique.'],
  },
  passwordHash: {
    type: String,
    required: true
  }
})

userSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.passwordHash
  }
})
userSchema.plugin(uniqueValidator, { message: 'Username and email should be unique.' })
const User = mongoose.model('User', userSchema)
module.exports = User