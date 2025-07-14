import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import cookieParser from 'cookie-parser'

import { connectDB } from './config/db.js'
import AuthRouter from './routes/authRoutes.js'
import UserRouter from './routes/userRoutes.js'
import postRouter from './routes/postRoutes.js'

const app = express()
const PORT = process.env.PORT || 4000

// Connect to MongoDB
connectDB()


const allowedOrigins = ['https://e-cell-smvit.onrender.com']
const corsOptions = {
    origin: function (origin, callback) {
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}


app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.send(`<h1>API is Working...</h1>`)
})

app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use('/api/v1/posts', postRouter)

app.use((req, res, next) => {
    res.status(404).json({ error: 'Resource not found' })
})

app.listen(PORT, () => {
    console.log(`✅ Server running on PORT: ${PORT}`)
})
