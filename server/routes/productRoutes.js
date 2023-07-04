const express = require('express');
const productController = require('../controllers/productController');
const cartController = require('../controllers/cartController');
const paymentController = require('../controllers/paymentController');
const authController = require('../controllers/authController');
const reviewRouter = require('./reviewRoutes');

const router = express.Router();

router.use('/:productId/reviews', reviewRouter);
// router.use(authController.protect);

router
  .route('/top-5-cheap')
  .get(productController.aliasTopProducts, productController.getAllProducts);

router.route('/product-stats').get(productController.getProductStates);
router.route('/monthly-plan/:year').get(productController.getMonthlyPlan);

// ROUTER
router.route('/').get(productController.getAllProducts);
router.route('/:id').get(productController.getProduct);

module.exports = router;
