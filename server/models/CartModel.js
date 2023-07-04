const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
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
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create a virtual attribute 'totalCost' on the cart schema
cartSchema.virtual('totalCost').get(function () {
  return this.products.reduce((total, product) => {
    return total + product.product.pricePerKg * product.quantity;
  }, 0);
});

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
