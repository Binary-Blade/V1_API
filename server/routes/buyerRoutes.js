// server/routes/buyerRoutes.js

const express = require('express');
const buyerController = require('../controllers/buyerController');
const authController = require('../controllers/authController');

const router = express.Router();
router.use(authController.protect, authController.restrictTo('admin', 'buyer'));

router
  .route('/:id')
  .get(buyerController.getBuyerPage)
  .patch(buyerController.updateBuyerPage);

module.exports = router;
