const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [7, 'Name of the project must at least 7 characters long'],
    maxlength: [27, 'Name of the project must be at maximum 27 characters long'],
  },
  startDay: {
    type: Date,
    required: true
  },
  endDay: {
    type: Date,
    required: true
  },
  members: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    canEdit: {
      type: Boolean
    },
    adminRights: {
      type: Boolean
    }
  }],
  projectOwner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  markings: [{
    timeMarking: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TimeMarking'
    }
  }],
  projectDescription: {
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