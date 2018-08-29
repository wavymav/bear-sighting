const mongoose = require('mongoose')

const bearSightingSchema = new mongoose.Schema({
  created: {
    type: Date,
    default: Date.now
  },
  bear_type: {
    type: String,
    trim: true,
    required: 'You must provide a bear type'
  },
  notes: {
    type: String
  },
  zip_code: {
    type: String
  },
  num_bears: {
    type: Number,
    min: 1
  }
})

bearSightingSchema.index({
  bear_type: 'text',
  zip_code: 'text'
})

module.exports = mongoose.model('BearSighting', bearSightingSchema)