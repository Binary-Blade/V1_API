const User = require('../models/UserModel');
const factory = require('./handlerFactory');
const Buyer = require('../models/buyerModel');

const catchAsync = require('../utils/catchAsync');
const resSuccess = require('../utils/responseSuccess');

exports.createBuyer = catchAsync(async (req, res, next) => {
  const newBuyer = await Buyer.create(req.body);
  res.status(201).json({
    status: 'success',
    data: newBuyer,
  });
  resSuccess(res, 201, { data: { buyer: newBuyer } });
});

exports.getAllUsersAsAdmin = factory.getAllDocs(User);
exports.updateOneUser = factory.updateOneAsAdmin(User);
exports.deleteOneUser = factory.deleteOneAsAdmin(User);
