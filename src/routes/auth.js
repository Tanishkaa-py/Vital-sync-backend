const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const protect = require('../middleware/auth');
const { authLimiter } = require('../middleware/rateLimiter');
const { validate, registerSchema, loginSchema } = require('../validators/schemas');

const router = express.Router();

const generateToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE || '7d' }
  );
};

// POST /api/auth/register
router.post('/register', validate(registerSchema), async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        status: 'error',
        code: 400,
        message: 'An account with this email already exists',
      });
    }

    const user = await User.create({ name, email, password, role });
    const token = generateToken(user._id, user.role);

    res.status(201).json({
      status: 'success',
      code: 201,
      message: 'Account created successfully',
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Registration failed. Please try again.',
    });
  }
});

// POST /api/auth/login — rate limited
router.post('/login', authLimiter, validate(loginSchema), async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Invalid email or password',
      });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({
        status: 'error',
        code: 401,
        message: 'Invalid email or password',
      });
    }

    const token = generateToken(user._id, user.role);

    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'Login successful',
      data: {
        token,
        user: { id: user._id, name: user.name, email: user.email, role: user.role },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Login failed. Please try again.',
    });
  }
});

// GET /api/auth/me
router.get('/me', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({
        status: 'error',
        code: 404,
        message: 'User not found',
      });
    }
    res.status(200).json({
      status: 'success',
      code: 200,
      message: 'User retrieved',
      data: { user },
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      code: 500,
      message: 'Server error',
    });
  }
});

module.exports = router;
