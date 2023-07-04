// AgriFlow/server/routes/paymentRoutes.js
const express = require('express');
const stripeWebhooks = require('../controllers/stripeWebhooks');

const router = express.Router();

router.post(
  '/api_v1/webhooks/stripe',
  stripe.webhooks.handle(
    'checkout.session.completed',
    stripeWebhooks.handleCheckoutSessionCompleted
  )
);

module.exports = router;
