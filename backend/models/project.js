const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  project: {
    type: String,
    minlength: [7, 'Name of the project must at least 7 characters long'],
    maxlength: [27, 'Name of the project must be at maximum 27 characters long'],
  },
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  weeks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Week'
  }],
  description: {
    type: String
  }
})

projectSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Project = mongoose.model('Project', projectSchema)
module.exports = Project