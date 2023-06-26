const Review = require('../models/reviewModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');

exports.getAllReviews = factory.getAllDocs(Review, (req) => {
  // custom filter
  if (req.params.productId) {
    return { product: req.params.productId };
  }
  return {};
});
exports.updateReview = catchAsync(async (req, res, next) => {
  const filter = { _id: req.params.id };
  const review = await Review.findOne(filter);

  if (!review) {
    return next(new AppError('No review found with that ID', 404));
  }
  // Check if the current user is the author of the review
  if (req.user._id.toString() !== review.user._id.toString()) {
    return next(new AppError('You can only update your own review', 403));
  }
  const update = req.body;
  const updatedReview = await Review.findOneAndUpdate(filter, update, {
    new: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      review: updatedReview,
    },
  });
});

exports.deleteReview = factory.deleteOneAsUser(Review); // ! Don't work. To do

exports.createReview = catchAsync(async (req, res, next) => {
  // Allow nested routes
  if (!req.body.product) req.body.product = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;

  const newReview = await Review.create({
    ...req.body,
    createdBy: req.user.id,
  });

  res.status(201).json({
    status: 'success',
    result: newReview.length,
    data: {
      newReview,
    },
  });
});
