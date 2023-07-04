const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/CartModel');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the current user's cart
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'products.product'
  );
  console.log(cart);

  if (!cart) {
    return res.status(400).json({
      status: 'fail',
      message: 'No products in cart',
    });
  }

  // 2) Create line_items array for the checkout session
  const line_items = cart.products.map((item) => {
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: item.product.name,
          description: item.product.description,
        },
        unit_amount: Math.round(item.product.pricePerKg * 100), // Stripe expects the price in cents
      },
      quantity: item.quantity,
    };
  });
  console.log(line_items);
  console.log(
    line_items.reduce(
      (total, item) => total + item.price_data.unit_amount * item.quantity,
      0
    ) / 100
  ); // total price in dollars

  // 3) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/products?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cards`,
    customer_email: req.user.email,
    line_items: line_items,
  });

  // 4) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});
