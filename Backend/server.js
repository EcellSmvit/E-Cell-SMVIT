import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'
import path from 'path'
import { fileURLToPath } from 'url'

import registrationRoutes from './routes/registrationRoutes.js'
import { connectDB } from './config/db.js'
import AuthRouter from './routes/authRoutes.js'
import UserRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'
import profileRouter from './routes/profileRoutes.js'
import adminRoutes from './routes/adminRoutes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const PORT = process.env.PORT || 4000

// ✅ Connect DB
connectDB()

// ✅ Allowed origins
const allowedOrigins = [
  'https://e-cell-smvit.onrender.com',
  'https://www.ecellsmvit.in',
  'https://ecellsmvit.in'
]

// ✅ CORS options
const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true) // allow Postman / curl

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      console.error('❌ Blocked by CORS:', origin)
      callback(new Error('Not allowed by CORS'))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}

// ✅ Apply CORS
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

// ✅ Extra fallback for OPTIONS (important for Render)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.header('Access-Control-Allow-Credentials', 'true')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// ✅ Middleware
app.use(express.json())
app.use(cookieParser())

// ✅ API routes
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/profile', profileRouter)
app.use('/api/admin', adminRoutes)
app.use('/api/registrations', registrationRoutes)

// ✅ Serve frontend build
app.use(express.static(path.join(__dirname, 'dist')))
app.get(/^(?!.*api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// ✅ 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' })
})

// ✅ Error handler
app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(500).json({ error: err.message || 'Something went wrong!' })
})

// ✅ Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
