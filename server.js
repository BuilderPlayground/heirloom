require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const assetRoutes = require('./routes/assets')
const Asset = require('./models/Asset')

const app = express()
const port = process.env.PORT || 8082

const readOnlyDemo =
  process.env.RENDER === 'true' ||
  process.env.NODE_ENV === 'production' ||
  process.env.DEMO_READ_ONLY === 'true'

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req, res) => {
  const assets = await Asset.find().sort({ updatedAt: -1 })
  res.render('index', { assets, readOnlyDemo })
})

app.use('/api/assets', (req, res, next) => {
  if (readOnlyDemo && req.method !== 'GET' && req.method !== 'HEAD') {
    return res.status(403).json({
      error: 'The public demo is read-only.'
    })
  }

  next()
})

app.use('/api/assets', assetRoutes)

async function startServer() {
  if (!process.env.MONGODB_URI) {
    throw new Error('MONGODB_URI is missing from the environment')
  }

  await mongoose.connect(process.env.MONGODB_URI, {
    dbName: 'heirloom'
  })

  app.listen(port, () => {
    console.log(`Heirloom running at http://localhost:${port}`)
  })
}

startServer().catch(error => {
  console.error('Unable to start Heirloom:', error.message)
  process.exit(1)
})
