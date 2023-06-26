const express = require('express');
const reviewController = require('../controllers/reviewController');
const authController = require('../controllers/authController');

// 3) ROUTES
const router = express.Router({ mergeParams: true });

router.use(authController.protect, authController.restrictTo('buyer', 'admin'));

router
  .route('/')
  .get(reviewController.getAllReviews)
  .post(reviewController.createReview);
router
  .route('/:id')
  .patch(reviewController.updateReview)
  .delete(reviewController.deleteReview);

module.exports = router;
