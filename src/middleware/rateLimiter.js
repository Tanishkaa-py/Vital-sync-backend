const rateLimit = require('express-rate-limit');

// Auth limiter - 10 attempts per 15 minutes per IP
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too many login attempts. Please try again in 15 minutes.',
    });
  },
});

// AI limiter - 20 requests per minute per IP
const aiLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 20,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too many AI requests. Please wait a moment before trying again.',
    });
  },
});

// General API limiter - 100 requests per minute
const generalLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res) => {
    res.status(429).json({
      status: 'error',
      code: 429,
      message: 'Too many requests. Please slow down.',
    });
  },
});

module.exports = { authLimiter, aiLimiter, generalLimiter };
