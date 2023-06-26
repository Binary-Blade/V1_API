const Buyer = require('../models/buyerModel');

const factory = require('./handlerFactory');

// UPDATE FARMER PAGE

exports.getBuyerPage = factory.getDoc(Buyer);
exports.updateBuyerPage = factory.updateOneAsUser(
  Buyer,
  [
    'phoneNumber',
    'location',
    'farmDescription',
    'farmImage',
    'category',
    'label',
  ],
  true
);
