const Product = require('../models/ProductModel');
const Farm = require('../models/FarmModel');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

// ------------------------------
// FARMER PAGE FUNCTIONS
// ------------------------------

// CREATE FARMER PAGE IF HAS NOT CREATE
exports.createFarmPage = catchAsync(async (req, res) => {
  const { farmDescription, farmImage, category, label } = req.body;
  const userId = req.user._id;

  const newPageFarm = await Farm.create({
    farmDescription,
    farmImage,
    category,
    label,
    createdBy: userId,
    owner: userId,
    farmAddress: req.user.farmAddress,
  });
  // Update the user's farms array
  await Farm.findByIdAndUpdate(userId, {
    $push: { farm: newPageFarm._id },
  });

  res.status(200).json({
    status: 'success',
    data: newPageFarm,
  });
});

// UPDATE FARMER PAGE
exports.updateFarmPage = factory.updateOneAsUser(Farm, [
  'localization',
  'farmDescription',
  'farmImage',
  'category',
  'label',
]);
// UPDATE PRODUCT
exports.updateProduct = factory.updateOneAsUser(Product, [
  'name',
  'description',
  'category',
  'pricePerKg',
]);

// DELETE FARMER PAGE
exports.deleteFarmPage = factory.deleteOneAsUser(Farm);

// PRODUCT FUNCTIONS
// ------------------------------

// CREATE PRODUCT
exports.createProduct = catchAsync(async (req, res, next) => {
  const { name, description, category, label, pricePerKg } = req.body;
  // Check if user exists
  if (!req.user) {
    return next(new AppError('User not authenticated', 401));
  }
  const productData = {
    name,
    description,
    category,
    label,
    pricePerKg,
  };
  const farmId = req.user.id;
  // Use the createProduct static method from your ProductModel
  const newProduct = await Product.createProduct(productData, farmId);
  res.status(201).json({
    status: 'success',
    data: newProduct,
  });
});
// DELETE PRODUCT
exports.deleteProduct = factory.deleteOneAsUser(Product);

// GET ALL FUNCTIONS
// ------------------------------

// GET ALL USER PRODUCTS
exports.getAllMyProducts = factory.getAllDocs(Product);

// GET ALL FARMS
exports.getAllFarms = factory.getAllDocs(Farm, null);

// GET SPECIFIC FARM
exports.getFarm = factory.getDoc(Farm, {
  select: ' farmAddress',
});

// LOCALIZATION
// ------------------------------

exports.getFarmWithin = catchAsync(async (req, res, next) => {
  const { distance, latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  const radius = unit === 'mi' ? distance / 3963.2 : distance / 6378.1;

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat, lng.',
        400
      )
    );
  }
  const farms = await Farm.find({
    farmAddress: { $geoWithin: { $centerSphere: [[lng, lat], radius] } },
  });

  res.status(200).json({
    status: 'success',
    results: farms.length,
    data: {
      data: farms,
    },
  });
});

exports.getDistances = catchAsync(async (req, res, next) => {
  const { latlng, unit } = req.params;
  const [lat, lng] = latlng.split(',');

  if (!lat || !lng) {
    next(
      new AppError(
        'Please provide latitude and longitude in the format lat, lng.',
        400
      )
    );
  }
  const multiplier = unit === 'mi' ? 0.000621371 : 0.001;
  const distances = await Farm.aggregate([
    {
      $geoNear: {
        near: {
          type: 'Point',
          coordinates: [parseFloat(lng), parseFloat(lat)],
        },
        distanceField: 'distance',
        distanceMultiplier: multiplier,
      },
    },
    {
      $project: {
        distance: 1,
        nameFarm: 1,
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      data: distances,
    },
  });
});
