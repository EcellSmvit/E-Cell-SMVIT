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

const allowedOrigins = [
  'https://e-cell-smvit.onrender.com',
  'https://www.ecellsmvit.in',
  'https://ecellsmvit.in'
]

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true)

    if (allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error(`CORS blocked: ${origin} not allowed`))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.options('*', cors(corsOptions))

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/v1/posts', postRouter)
app.use('/api/profile', profileRouter)
app.use('/api/admin', adminRoutes)
app.use('/api/registrations', registrationRoutes)

app.use(express.static(path.join(__dirname, 'dist')))
app.get(/^(?!.*api).*/, (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'))
})

app.use((req, res) => {
  res.status(404).json({ error: 'Resource not found' })
})

app.use((err, req, res, next) => {
  console.error('❌ Error:', err.message)
  res.status(500).json({ error: err.message || 'Something went wrong!' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`)
})
