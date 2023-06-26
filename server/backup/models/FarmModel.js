const mongoose = require('mongoose');
const { categorySchema, labelSchema } = require('./CategoryLabel');
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
    nameFarm: String,
    numSIREN: {
      type: Number,
      // required: [true, 'a Farm need a SIREN num'],
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
    category: {
      type: [categorySchema],
      required: true,
    },
    label: {
      type: [labelSchema],
      required: true,
    },
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
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

// farmSchema.virtual('farmAddress').get(function () {
//   if (this.user && this.user.geolocation && this.user.geolocation.address) {
//     return {
//       type: this.user.geolocation.type,
//       coordinates: this.user.geolocation.coordinates,
//       address: this.user.geolocation.address,
//     };
//   }
//   return null;
// });

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
