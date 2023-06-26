const mongoose = require('mongoose');
const { categorySchema, labelSchema } = require('../utils/CategoryLabel');
const geoLocationSchema = require('../utils/geoLocationModel');
// const Product = require('./ProductModel');
// PARENT OF :
//CHILD OF: userModel.js

const farmSchema = new mongoose.Schema(
  {
    _id: {
      // link user id farmer to the farm page
      type: mongoose.Schema.ObjectId,
      auto: false,
    },
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
    numSIREN: {
      type: Number,
    },
    farmDescription: {
      type: String,
    },
    farmHistory: {
      type: String,
    },
    farmImageCover: {
      type: String,
    },
    farmAddress: geoLocationSchema,
    category: {
      type: [categorySchema],
    },
    label: {
      type: [labelSchema],
    },
    // PRODUCT
    products: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Product',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
farmSchema.index({ farmAddress: '2dsphere' });

// TODO Si l'utilisateur désactive son compte, sa page farmer est désactivé aussi, et non supprimé.
// TODO 2 : Si l'utilisateur désactive son compte, tous ses produits sont désactivés aussi
// TODO 3 : Si l'utilisateur supprime sa page, tous les produits associés seront associés aussi
farmSchema.pre(/^find/, function (next) {
  // if (process.env.NODE_ENV === 'development') {
  //   this.populate('products');
  // }
  this.populate({
    path: 'products',
    select: '-_id -buyers -__v -buyers -farm -slug',
  });
  next();
});

// STATIC METHOD

const Farm = mongoose.model('Farm', farmSchema);
module.exports = Farm;
