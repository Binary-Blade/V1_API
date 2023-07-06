const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');
const authController = require('../controllers/authController');


router
  .route('/')
  .get(authController.protect, cartController.getCart)
  .post(authController.protect, cartController.addToCart);

router
  .route('/:productId')
  .delete(authController.protect, cartController.deleteProductFromCartById);


module.exports = router;
