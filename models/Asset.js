const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 150
  },
  category: {
    type: String,
    required: true,
    enum: [
      'financial',
      'property',
      'business',
      'intellectual-property',
      'digital',
      'creative',
      'institutional',
      'other'
    ]
  },
  description: String,

  estimatedValue: {
    type: Number,
    min: 0
  },
  ownershipStatus: {
    type: String,
    enum: ['owned', 'shared', 'pending', 'unknown'],
    default: 'unknown'
  },
  beneficiaryStatus: {
    type: String,
    enum: ['confirmed', 'unknown', 'not-applicable'],
    default: 'unknown'
  },
  continuityStatus: {
    type: String,
    enum: ['in-place', 'needs-review', 'not-started'],
    default: 'not-started'
  },
  notes: String,

  lastReviewed: Date
}, { timestamps: true })

module.exports = mongoose.model('Asset', assetSchema)
