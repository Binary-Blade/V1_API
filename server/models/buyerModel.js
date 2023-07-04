const mongoose = require('mongoose');
const geoLocation = require('../utils/geoLocationModel');

const buyerSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.ObjectId,
      auto: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    favoriteFarms: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Farm',
      },
    ],
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    addressBuyer: geoLocation,
    cartItems: [
      {
        product: {
          type: mongoose.Schema.ObjectId,
          ref: 'Product',
        },
        quantity: {
          type: Number,
          default: 1,
        },
      },
    ],
    stripeCustomerId: {
      type: String,
    },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'debitCard', 'paypal', 'stripe'],
    },
    paypalAccount: {
      type: String,
    },
    preferences: {
      favoriteProducts: [String],
      preferredDeliveryTimes: [String],
    },
    orderHistory: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Order',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

buyerSchema.index({ buyerAddress: '2dsphere' });

const Buyer = mongoose.model('Buyer', buyerSchema);

module.exports = Buyer;
