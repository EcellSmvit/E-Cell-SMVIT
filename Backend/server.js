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
const allowedOrigins = ['https://e-cell-smvit.onrender.com']

connectDB()

app.use(express.json())
app.use(cookieParser())

// CORS middleware - set headers manually for all responses
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header('Access-Control-Allow-Origin', origin);
        res.header('Access-Control-Allow-Credentials', 'true');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    }
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.get('/', (req, res) => {
    res.send(`<h1>API is Working...</h1>`)
})
app.use('/api/auth', AuthRouter)
app.use('/api/user', UserRouter)
app.use("/api/v1/posts", postRouter);

app.use((req, res, next) => {
    res.status(404).json({ error: 'Resource not found' });
})

app.listen(PORT, () => {
    console.log(`Server running on PORT : ${PORT}`)
})