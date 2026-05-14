const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const appointmentRoutes = require('./routes/appointments');
const prescriptionRoutes = require('./routes/prescriptions');
const paymentRoutes = require('./routes/payments');
const aiRoutes = require('./routes/ai');
const { generalLimiter } = require('./middleware/rateLimiter');
const { globalErrorHandler } = require('./middleware/errorHandler');

const app = express();
app.set('trust proxy', 1);

const allowedOrigins = [
  process.env.FRONTEND_URL,
].filter(Boolean);

app.use(cors({
  origin: (origin, callback) => {
    if (!origin) {
      if (process.env.NODE_ENV === 'development') {
        return callback(null, true);
      }
      return callback(new Error('No origin — blocked in production'), false);
    }
    if (process.env.NODE_ENV === 'production' && origin.includes('localhost')) {
      return callback(new Error('localhost not allowed in production'), false);
    }
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }
    return callback(new Error(`CORS blocked: ${origin} not allowed`), false);
  },
  credentials: true,
}));

app.use(express.json({ limit: '10kb' }));  // parse request bodies
app.use(generalLimiter);                   // apply rate limit to all routes

app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);

app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'VitalSync API is running',
    version: '3.0.0',
    features: ['Auth + JWT', 'Full CRUD', 'Stripe Payments', 'Gemini AI', 'Rate Limiting', 'Joi Validation'],
  });
});

app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Route ${req.originalUrl} not found`,
  });
});

app.use(globalErrorHandler);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      if (process.env.NODE_ENV !== 'production') {
        process.stdout.write(`Server running on port ${PORT}\n`);
        process.stdout.write(`MongoDB connected\n`);
      }
    });
  })
  .catch((err) => {
    process.stderr.write(`MongoDB connection failed: ${err.message}\n`);
    process.exit(1);
  });