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

connectDB()

// ✅ Define corsOptions first
const allowedOrigins = ['https://e-cell-smvit.onrender.com']
const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true)
    if (allowedOrigins.includes(origin)) {
      return callback(null, true)
    } else {
      return callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  optionsSuccessStatus: 200,
}

// ✅ Now use it
app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

// API routes
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/profile', profileRouter)
app.use('/api/admin', adminRoutes)
app.use('/api/registrations', registrationRoutes)

// Serve frontend
app.use(express.static(path.join(__dirname, 'dist')))
app.get(/^(?!.*api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' })
})

// Optional: error handler (good for debugging)
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({ error: 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
