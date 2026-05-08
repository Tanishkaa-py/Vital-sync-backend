// Global error response formatter
const errorResponse = (res, statusCode, message, errors = null) => {
  const response = {
    status: 'error',
    code: statusCode,
    message,
  };
  if (errors) response.errors = errors;
  return res.status(statusCode).json(response);
};

// Global success response formatter  
const successResponse = (res, statusCode, message, data = null) => {
  const response = {
    status: 'success',
    code: statusCode,
    message,
  };
  if (data) response.data = data;
  return res.status(statusCode).json(response);
};

// Global Express error handler middleware (add to end of app)
const globalErrorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal server error';

  // Mongoose duplicate key error
  if (err.code === 11000) {
    statusCode = 400;
    const field = Object.keys(err.keyValue)[0];
    message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = Object.values(err.errors).map((e) => e.message).join(', ');
  }

  // Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  }
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token has expired';
  }

  res.status(statusCode).json({
    status: 'error',
    code: statusCode,
    message,
  });
};

module.exports = { errorResponse, successResponse, globalErrorHandler };
