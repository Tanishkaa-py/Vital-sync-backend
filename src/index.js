const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const patientRoutes = require('./routes/patients');
const appointmentRoutes = require('./routes/appointments');
const prescriptionRoutes = require('./routes/prescriptions');
const paymentRoutes = require('./routes/payments');

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/prescriptions', prescriptionRoutes);
app.use('/api/payments', paymentRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'VitalSync API is running',
    status: 'healthy',
    routes: [
      'POST   /api/auth/register',
      'POST   /api/auth/login',
      'GET    /api/appointments',
      'POST   /api/appointments',
      'PUT    /api/appointments/:id',
      'DELETE /api/appointments/:id',
      'GET    /api/prescriptions',
      'POST   /api/prescriptions',
      'PUT    /api/prescriptions/:id',
      'DELETE /api/prescriptions/:id',
      'POST   /api/payments/create-checkout-session',
      'GET    /api/payments/verify/:sessionId',
    ],
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    app.listen(PORT, () => console.log('Server running on port ' + PORT));
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });
