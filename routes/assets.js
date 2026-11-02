const express = require('express')
const mongoose = require('mongoose')
const Asset = require('../models/Asset')

const router = express.Router()

const editableFields = [
  'name',
  'category',
  'description',
  'estimatedValue',
  'ownershipStatus',
  'beneficiaryStatus',
  'continuityStatus',
  'notes',
  'lastReviewed'
]

function getAssetData(body = {}) {
  const data = {}

  for (const field of editableFields) {
    if (Object.hasOwn(body, field)) {
      data[field] = body[field]
    }
  }

  return data
}

router.param('id', (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid asset ID' })
  }

  next()
})

router.get('/', async (req, res) => {
  const assets = await Asset.find().sort({ updatedAt: -1 })
  res.json(assets)
})

router.get('/:id', async (req, res) => {
  const asset = await Asset.findById(req.params.id)

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  res.json(asset)
})

router.post('/', async (req, res) => {
  const asset = await Asset.create(getAssetData(req.body))
  res.status(201).json(asset)
})

router.put('/:id', async (req, res) => {
  const asset = await Asset.findByIdAndUpdate(
    req.params.id,
    getAssetData(req.body),
    { new: true, runValidators: true }
  )

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  res.json(asset)
})

router.delete('/:id', async (req, res) => {
  const asset = await Asset.findByIdAndDelete(req.params.id)

  if (!asset) {
    return res.status(404).json({ error: 'Asset not found' })
  }

  res.status(204).send()
})

router.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error)
  }

  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return res.status(400).json({ error: error.message })
  }

  console.error(error)
  res.status(500).json({ error: 'Asset request failed' })
})

module.exports = router