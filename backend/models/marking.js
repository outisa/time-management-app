const mongoose = require('mongoose')

const timeMarkingSchema = new mongoose.Schema({
  day: {
    type: Date
  },
  timeMarked: {
    type: Number,
    min: [0, 'Time used cannot be negative'],
    max: [86400, 'Time used for a user in a day cannot be over 24 hours (86400 seconds)']
  },
  description: {
    type: String
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
})

timeMarkingSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const TimeMarking = mongoose.model('TimeMarking', timeMarkingSchema)
module.exports = TimeMarking