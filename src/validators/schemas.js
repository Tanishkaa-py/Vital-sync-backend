const Joi = require('joi');

const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required().messages({
    'string.min': 'Name must be at least 2 characters',
    'string.max': 'Name cannot exceed 50 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'any.required': 'Password is required',
  }),
  role: Joi.string().valid('patient', 'doctor').default('patient'),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address',
    'any.required': 'Email is required',
  }),
  password: Joi.string().min(1).required().messages({
    'any.required': 'Password is required',
  }),
});

const appointmentSchema = Joi.object({
  doctorName: Joi.string().min(2).max(100).required().messages({
    'string.min': 'Doctor name must be at least 2 characters',
    'any.required': 'Doctor name is required',
  }),
  specialty: Joi.string().min(2).max(100).required().messages({
    'any.required': 'Specialty is required',
  }),
  date: Joi.string().required().messages({
    'any.required': 'Date is required',
  }),
  timeSlot: Joi.string().required().messages({
    'any.required': 'Time slot is required',
  }),
  notes: Joi.string().max(500).allow('').optional(),
  status: Joi.string().valid('pending', 'confirmed', 'completed', 'cancelled').optional(),
});

const prescriptionSchema = Joi.object({
  medicationName: Joi.string().min(2).max(100).required().messages({
    'any.required': 'Medication name is required',
  }),
  dosage: Joi.string().min(1).max(50).required().messages({
    'any.required': 'Dosage is required',
  }),
  frequency: Joi.string().required().messages({
    'any.required': 'Frequency is required',
  }),
  duration: Joi.string().required().messages({
    'any.required': 'Duration is required',
  }),
  doctorName: Joi.string().max(100).allow('').optional(),
  notes: Joi.string().max(500).allow('').optional(),
  status: Joi.string().valid('active', 'completed', 'discontinued').optional(),
});

const aiSuggestSchema = Joi.object({
  prompt: Joi.string().min(3).max(500).required().messages({
    'string.min': 'Prompt must be at least 3 characters',
    'string.max': 'Prompt cannot exceed 500 characters',
    'any.required': 'Prompt is required',
  }),
  context: Joi.string().valid('symptoms', 'medication', 'appointment', 'general').default('general'),
});

const validate = (schema) => (req, res, next) => {
  const { error, value } = schema.validate(req.body, { abortEarly: false });
  if (error) {
    const messages = error.details.map((d) => d.message);
    return res.status(400).json({
      status: 'error',
      code: 400,
      message: 'Validation failed',
      errors: messages,
    });
  }
  req.body = value;
  next();
};

module.exports = {
  validate,
  registerSchema,
  loginSchema,
  appointmentSchema,
  prescriptionSchema,
  aiSuggestSchema,
};
