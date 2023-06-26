const Product = require('../models/ProductModel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// ------------------------------
// ALIAS TOP PRODUCTS FUNCTION
// ------------------------------

exports.aliasTopProducts = (req, res, next) => {
  req.query.limit = '5';
  req.query.sort = '-ratingsAverage+price';
  req.query.fields = 'name+price+ratingsAverage+summary+difficulty';
  next();
};

// ------------------------------
// FACTORY FUNCTIONS
// ------------------------------

exports.getAllProducts = factory.getAllDocs(Product, null, ['farmLocation']);
exports.getProduct = factory.getDoc(Product, ['reviews', 'farmLocation']);
// ------------------------------
// PRODUCT FUNCTIONS
// ------------------------------

exports.getProductStates = catchAsync(async (req, res, next) => {
  const stats = await Product.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numProduct: { $sum: 1 },
        numRatings: { $sum: '$ratingsQuantity' },
        avgRating: { $avg: '$ratingsAverage' },
        avgPrice: { $avg: '$price' },
        minPrice: { $min: '$price' },
        maxPrice: { $max: '$price' },
      },
    },
    {
      $sort: { avgPrice: 1 },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      stats,
    },
  });
});

exports.getMonthlyPlan = catchAsync(async (req, res, next) => {
  const year = req.params.year * 1; // 2022
  const plan = await Product.aggregate([
    {
      $unwind: '$startDates',
    },
    {
      $match: {
        startDates: {
          $gte: new Date(`${year}-01-01`),
          $lte: new Date(`${year}-12-31`),
        },
      },
    },
    {
      $group: {
        _id: { $month: '$startDates' },
        numProductStarts: { $sum: 1 },
        products: { $push: '$name' },
      },
    },
    {
      $addFields: { month: '$_id' },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: { numProductStarts: -1 },
    },
    {
      $limit: 12,
    },
  ]);

  res.status(200).json({
    status: 'success',
    data: {
      plan,
    },
  });
});
