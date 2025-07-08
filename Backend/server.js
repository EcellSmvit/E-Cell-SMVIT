import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;
connectDB();

const allowedOrigins = ['http://localhost:5173', 'https://e-cell-smvit.onrender.com'];

// Fix: CORS middleware should be placed before express.json() and cookieParser() to avoid CORS preflight issues
app.use(cors({
  origin: allowedOrigins,
  credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Optional: Add a catch-all error handler for unhandled errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
