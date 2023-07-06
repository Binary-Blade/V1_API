const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');
const orderController = require('../controllers/orderController');
const paymentController = require('../controllers/paymentController');

router
  .route('/')
  .get(authController.protect, cartController.getCart)
  .post(authController.protect, cartController.addToCart);

router
  .route('/:productId')
  .delete(authController.protect, cartController.deleteProductFromCartById);

router.post(
  '/checkout-session/:cartId',
  authController.protect,
  paymentController.generateCheckoutSession
);

router
  .route('/create')
  .post(authController.protect, orderController.createOrder);

router.route('/orderDetails/:orderId').get(orderController.getOrderDetails);

module.exports = router;
