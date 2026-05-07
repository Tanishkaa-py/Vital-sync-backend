const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const protect = require('../middleware/auth');

const router = express.Router();

// ── POST /api/payments/create-checkout-session ────────────────────────────────
// Creates a Stripe Checkout session for "VitalSync Pro" upgrade
router.post('/create-checkout-session', protect, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_email: req.user.email,
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: {
              name: 'VitalSync Pro',
              description: 'Unlimited appointments, priority doctor access, advanced health analytics',
              images: [],
            },
            unit_amount: 49900, // ₹499 in paise
          },
          quantity: 1,
        },
      ],
      success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment/cancelled`,
      metadata: {
        userId: req.user._id.toString(),
        userEmail: req.user.email,
      },
    });

    res.status(200).json({ url: session.url, sessionId: session.id });
  } catch (error) {
    console.error('Stripe error:', error.message);
    res.status(500).json({ message: 'Payment session creation failed', error: error.message });
  }
});

// ── GET /api/payments/verify/:sessionId ──────────────────────────────────────
// Verifies a completed payment session
router.get('/verify/:sessionId', protect, async (req, res) => {
  try {
    const session = await stripe.checkout.sessions.retrieve(req.params.sessionId);

    if (session.payment_status === 'paid') {
      res.status(200).json({
        paid: true,
        customerEmail: session.customer_email,
        amount: session.amount_total,
        currency: session.currency,
      });
    } else {
      res.status(200).json({ paid: false });
    }
  } catch (error) {
    res.status(500).json({ message: 'Verification failed', error: error.message });
  }
});

module.exports = router;
