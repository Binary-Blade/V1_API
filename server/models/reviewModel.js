const mongoose = require('mongoose');
const Product = require('./ProductModel');

const reviewSchema = new mongoose.Schema(
  {
    review: {
      type: String,
      required: [true, 'Review can not be empty'],
    },
    rating: {
      type: Number,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    product: {
      type: mongoose.Schema.ObjectId,
      ref: 'Product',
      required: [true, 'Review must belong to a product'],
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: [true, 'Review must belong to a buyer'],
    },
  },
  { toJSON: { virtuals: true }, toObject: { virtuals: true } }
);

reviewSchema.index({ rating: 1 });
reviewSchema.index({ product: 1, user: 1 }, { unique: true }); // MAKE UNIQUE REVIEW PER PERSON
reviewSchema.pre(/^find/, function (next) {
  // if (process.env.NODE_ENV === 'development') {
  //   this.populate('products');
  // }
  // this.populate({
  //   path: 'product',
  //   select: 'name',
  // }).populate({
  //   path: 'user',
  //   select: ' name',
  // });
  this.populate({
    path: 'user',
    select: ' name',
  });
  next();
});

reviewSchema.post('save', function () {
  // `this` points to the current review
  Product.calculateAverageRating(this.product);
});

reviewSchema.post(/^findOneAnd(?:Update|Delete)$/, async (doc, next) => {
  if (doc) {
    await Product.calculateAverageRating(doc.product);
  }
  next();
});

const Review = mongoose.model('Review', reviewSchema);
Review.init();

module.exports = Review;
