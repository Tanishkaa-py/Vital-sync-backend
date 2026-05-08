const express = require('express');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const protect = require('../middleware/auth');
const { aiLimiter } = require('../middleware/rateLimiter');
const { validate, aiSuggestSchema } = require('../validators/schemas');
console.log(process.env.GEMINI_API_KEY);

const router = express.Router();

// System prompt that scopes Gemini to healthcare context only
const SYSTEM_PROMPT = `You are VitalSync AI, a helpful healthcare assistant embedded in a patient dashboard.
Your role is to provide general health information, help patients understand medical terms, suggest questions to ask their doctor, and provide wellness tips.
You must NEVER diagnose conditions, prescribe medications, or replace professional medical advice.
Always remind users to consult their doctor for medical decisions.
Keep responses concise, clear, and under 200 words.
Format responses in plain text without markdown.`;

// Context-specific prompt prefixes
const CONTEXT_PREFIXES = {
  symptoms: 'The patient is asking about symptoms. Provide general information and strongly encourage consulting a doctor: ',
  medication: 'The patient is asking about medication. Provide general information only, never dosage advice: ',
  appointment: 'The patient needs help preparing for a doctor appointment: ',
  general: 'The patient has a general health question: ',
};

// POST /api/ai/suggest
router.post(
  '/suggest',
  aiLimiter,
  protect,
  validate(aiSuggestSchema),
  async (req, res) => {
    try {
      const { prompt, context } = req.body;

      // Gemini API key must stay on server - never exposed to frontend
      const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: 'gemini-3.1-flash-lite' });

      const contextPrefix = CONTEXT_PREFIXES[context] || CONTEXT_PREFIXES.general;
      const fullPrompt = `${SYSTEM_PROMPT}\n\n${contextPrefix}${prompt}`;

      const result = await model.generateContent(fullPrompt);
      const response = result.response;
      const text = response.text();

      res.status(200).json({
        status: 'success',
        code: 200,
        message: 'AI response generated',
        data: {
          response: text,
          context,
          disclaimer: 'This is general health information only. Always consult a qualified doctor for medical advice.',
        },
      });
    } catch (error) { console.log("FULL AI ERROR:", error);
      if (error.message?.includes('API_KEY')) {
        return res.status(500).json({
          status: 'error',
          code: 500,
          message: 'AI service configuration error. Please contact support.',
        });
      }
      if (error.message?.includes('quota') || error.message?.includes('QUOTA')) {
        return res.status(429).json({
          status: 'error',
          code: 429,
          message: 'AI service quota exceeded. Please try again later.',
        });
      }
      res.status(500).json({
        status: 'error',
        code: 500,
        message: 'AI service temporarily unavailable.',
      });
    }
  }
);

module.exports = router;
