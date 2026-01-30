// Backend/server.js
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';  // Add this import
import userRoutes from './Routes/User.js';
import productRoutes from './Routes/Product.js';
import addToCartRoutes from './Routes/Cart.js';
import addressRoutes from './Routes/Address.js';
import paymentRouter from './Routes/payment.js';
import dotenv from 'dotenv';
dotenv.config({ path: './config/config.env' });

const app = express();
const PORT = process.env.PORT;

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { 
  dbName: "E_commerce" 
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Middleware - Order is important here!
app.use(express.json());
app.use(cookieParser());  // Add this before CORS

// CORS Configuration
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept'],
  exposedHeaders: ['set-cookie'],
  preflightContinue: false,
  optionsSuccessStatus: 204
}));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', addToCartRoutes);
app.use('/api/addresses', addressRoutes);
// /payment router
app.use('/api/payment',paymentRouter)

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});