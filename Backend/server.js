import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import cookieParser from 'cookie-parser';
import connectDB from './config/mongodb.js';
import authRouter from './routes/authRoutes.js';
import userRouter from './routes/userRoutes.js';

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB
connectDB();

// ✅ Allowed frontend origins
const allowedOrigins = [
  'http://localhost:5173',           // local dev
  'https://e-cell-smvit.onrender.com' // production frontend
];

// ✅ CORS config to support cookies from multiple origins
app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (e.g., curl or mobile apps)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true // Allow sending cookies
}));

// ✅ Log incoming cookies for debugging
app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.path} | Cookies:`, req.cookies);
  next();
});

// ✅ Middlewares
app.use(express.json());     // to parse JSON bodies
app.use(cookieParser());     // to parse cookies

// ✅ Routes
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// ✅ Global error handler (optional)
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

// ✅ Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
