const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new mongoose.Schema(
  {
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    products: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: 'Product',
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
    statusDelivery: {
      type: String,
      enum: ['placed', 'shipped', 'delivered', 'cancelled'],
      default: 'placed',
    },
    trackingInfo: String,
    paymentInfo: {
      type: {
        type: String,
        enum: ['credit_card', 'debit_card', 'paypal', 'bank_transfer'],
      },
      status: {
        type: String,
        enum: ['pending', 'processing', 'completed', 'cancelled', 'paid'], // Ajoutez 'paid' ici
        default: 'pending',
      },
    },
  }, // Virtual properties
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// virtual properties : Total of ordering
orderSchema.virtual('total').get(function () {
  let total = 0;
  this.products.forEach((product) => {
    total += product.price * product.quantity;
  });
  return total;
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
