const mongoose = require('mongoose')

const weekSchema = new mongoose.Schema({
  weekNumber: {
    type: Number,
    min: [0, 'Week number cannot fall below 0'],
  },
  markings: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Markings'
  }],
})

weekSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
  }
})

const Week = mongoose.model('Week', weekSchema)
module.exports = Week