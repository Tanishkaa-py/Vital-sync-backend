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

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json({ limit: '10kb' }));

// Apply general rate limiter to all routes
app.use(generalLimiter);

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/payments', paymentRoutes);
app.use('/api/ai', aiRoutes);

// Health check
app.get('/', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'VitalSync API is running',
    version: '3.0.0',
    features: ['Auth + JWT', 'Full CRUD', 'Stripe Payments', 'Gemini AI', 'Rate Limiting', 'Joi Validation'],
  });
});

// 404 handler for unknown routes
app.use('*', (req, res) => {
  res.status(404).json({
    status: 'error',
    code: 404,
    message: `Route ${req.originalUrl} not found`,
  });
});

// Global error handler — must be last
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
