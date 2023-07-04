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
  paymentController.getCheckoutSession
);

router.route('/order').post(orderController.createOrder);
router.get('/orderDetails/:orderId', orderController.getOrderDetails);

module.exports = router;
