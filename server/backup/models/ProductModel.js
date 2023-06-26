const mongoose = require('mongoose');
const slugify = require('slugify');
const { categorySchema, labelSchema } = require('./CategoryLabel');

const productSchema = new mongoose.Schema(
  {
    // Product name
    name: {
      type: String,
      required: [true, 'a Product must have a name'],
      unique: true,
    },
    photo: {
      type: String,
    },

    // Product description
    description: {
      type: String,
      trim: true,
      maxlength: [
        250,
        'a description must have less or equal then 250 characters',
      ],
    },

    // Product slug
    slug: String,

    // Product category
    category: {
      type: [categorySchema],
      required: [true, 'Please provide the product category'],
    },
    label: {
      type: [labelSchema],
      required: true,
    },
    isSeason: {
      // TODO : Rajouter une image de saison au dessus de la création de produit pour agriculteur
      type: Boolean,
    },
    isNewSeason: {
      // If it vegetable new or not
      type: Boolean,
    },

    // Product price per kg
    pricePerKg: {
      type: Number,
      required: [true, 'Please provide the price per kg'],
      max: [200, 'Please provide the correct price for kg'],
    },
    // Product price per gram
    pricePerGram: {
      type: Number,
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 0,
      set: (val) => Math.round((val * 10) / 10), // 3.4444 => 35 => 3.5
    },
    // Farm reference
    farm: {
      type: mongoose.Schema.ObjectId,
      ref: 'Farm',
      required: [true, 'A product must be associated with a farm'],
    },
    // Product creator
    createdBy: {
      type: mongoose.Schema.ObjectId,
      ref: 'Farm',
    },
    // Product buyers
    buyers: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Buyer',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.index({ pricePerKg: 1, ratingsAverage: -1 });
productSchema.index({ slug: 1 });
productSchema.index({ category: 1 });

// VIRTUAL POPULATE
// Add a virtual property to get the localization from the associated farm
productSchema.virtual('farmLocation', {
  ref: 'User',
  localField: 'farm.user',
  foreignField: '_id',
  justOne: true,
});

// Add a virtual property to get the review from the associated review
productSchema.virtual('reviews', {
  ref: 'Review',
  foreignField: 'product',
  localField: '_id',
});
productSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  this.pricePerGram = this.pricePerKg / 1000;
  next();
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: 'farmLocation',
    select: 'geolocation',
  });
  next();
});

// STATIC

// CALCULATE AVERAGE
productSchema.statics.calculateAverageRating = async function (productId) {
  const Review = this.model('Review');
  try {
    const stats = await Review.aggregate([
      { $match: { product: productId } },
      {
        $group: {
          _id: '$product',
          nRatings: { $sum: 1 },
          avgRating: { $avg: '$rating' },
        },
      },
    ]);

    if (stats.length > 0) {
      await this.findByIdAndUpdate(productId, {
        ratingsQuantity: stats[0].nRatings,
        ratingsAverage: stats[0].avgRating,
      });
    } else {
      await this.findByIdAndUpdate(productId, {
        ratingsQuantity: 0,
        ratingsAverage: 0,
      });
    }
  } catch (error) {
    console.error('Error in calculateAverageRating:', error);
  }
};

// CREATE PRODUCT
// ! MAYBE It'S NOT NECESSARY NOW ???
productSchema.statics.createProduct = async function (productData, farmId) {
  if (!farmId) {
    throw new Error('A product must have a creator');
  }
  const newProduct = new this({
    ...productData,
    createdBy: farmId,
    farm: farmId,
  });

  await newProduct.save();

  // Update the farm's products array directly
  const Farm = this.model('Farm');
  await Farm.findByIdAndUpdate(farmId, {
    $push: { products: newProduct._id },
  });

  return newProduct;
};
// ! SAME FOR FHAT ???
// AGGREGATION MIDDLEWARE
productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretProduct: { $ne: true } } });
  next();
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
