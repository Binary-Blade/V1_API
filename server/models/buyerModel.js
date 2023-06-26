// PARENT OF :
//CHILD OF: userModel.js
const mongoose = require('mongoose');
const geoLocation = require('../utils/geoLocationModel');

const buyerSchema = new mongoose.Schema(
  {
    _id: {
      // link user id buyer to the buyer account
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
        ref: 'Farm', // Update this reference to match the correct model name
      },
    ],
    phoneNumber: {
      type: String,
    },
    dateOfBirth: {
      type: Date,
    },
    adressBuyer: geoLocation,
    // billingAddress: {
    //   type: addressSchema,
    // },
    // shippingAddress: {
    //   type: addressSchema,
    // },
    paymentMethod: {
      type: String,
      enum: ['creditCard', 'debitCard', 'paypal'],
    },
    creditCard: {
      number: {
        type: String,
        required: function () {
          return this.paymentMethod === 'creditCard';
        },
      },
      expirationDate: {
        type: Date,
        required: function () {
          return this.paymentMethod === 'creditCard';
        },
      },
      cvv: {
        type: String,
        required: function () {
          return this.paymentMethod === 'creditCard';
        },
      },
    },
    debitCard: {
      number: {
        type: String,
        required: function () {
          return this.paymentMethod === 'debitCard';
        },
      },
      expirationDate: {
        type: Date,
        required: function () {
          return this.paymentMethod === 'debitCard';
        },
      },
      cvv: {
        type: String,
        required: function () {
          return this.paymentMethod === 'debitCard';
        },
      },
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

// buyerSchema.virtual('geolocation').get(function () {
//   return {
//     type: this.user.geolocation.type,
//     coordinates: this.user.geolocation.coordinates,
//     address: this.user.geolocation.address,
//   };
// });

// buyerSchema.pre(/^find/, function (next) {
//   this.populate({
//     path: 'user',
//     select: 'geolocation',
//   });
//   next();
// });
const Buyer = mongoose.model('Buyer', buyerSchema);
module.exports = Buyer;
