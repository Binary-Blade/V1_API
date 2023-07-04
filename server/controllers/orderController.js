const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = async (req, res) => {
  const { stripeToken, cart } = req.body;

  // Create a charge using Stripe
  const charge = await stripe.charges.create({
    amount: cart.total * 100,
    currency: 'usd',
    source: stripeToken, // Use the Stripe token from the client
    description: 'Order payment',
  });

  // Create an order in your database
  const newOrder = new Order({
    buyer: req.user._id,
    products: cart.products,
    paymentInfo: {
      type: 'credit_card',
      status: 'paid',
    },
    // other fields...
  });

  newOrder.save((err, order) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
    res.status(200).json({ message: 'Order created successfully', order });
  });
};

exports.getOrderDetails = catchAsync(async (req, res) => {
  const { orderId } = req.params;
  const { session_id } = req.query;

  // Get order details from the database
  const order = await Order.findById(orderId).populate('products.product');

  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'No order found with that ID',
    });
  }

  res.status(200).json({
    orderId,
    session_id,
    // Add a check for orderNumber here once it's included in your schema
    orderNumber: order.orderNumber ? order.orderNumber : 'Not available',
    date: order.date,
    products: order.products.map((p) => ({
      name: p.product.name,
      pricePerKg: p.product.pricePerKg,
      quantity: p.quantity,
    })),
    total: order.total,
  });
});
