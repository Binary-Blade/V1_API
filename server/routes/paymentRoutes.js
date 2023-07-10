const express = require('express');

const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');

const router = express.Router();

router.post(
  '/checkout-session/:cartId',
  authController.protect,
  paymentController.generateCheckoutSession
);

router.get('/success', paymentController.handleSuccess);

module.exports = router;


