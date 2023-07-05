const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/CartModel');
const Payment = require('../models/Payment');
const catchAsync = require('../utils/catchAsync');

exports.getCheckoutSession = catchAsync(async (req, res, next) => {
  // 1) Get the current user's cart
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'products.product'
  );

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
          metadata: {
            productId: item.product._id.toString(),
          },
        },
        unit_amount: Math.round(item.product.pricePerKg * 100),
      },
      quantity: item.quantity,
    };
  });

  // 3) Create checkout session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    mode: 'payment',
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/api_v1/cart/orderDetails/${cart.id}?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cards`,
    customer_email: req.user.email,
    line_items: line_items,
  });

  // Replace {CHECKOUT_SESSION_ID} with session.id in the success_url
  session.success_url = session.success_url.replace(
    '{CHECKOUT_SESSION_ID}',
    session.id
  );

  // Save the session ID to the database
  const payment = new Payment({
    user: req.user.id,
    order: cart.id,
    amount: session.amount_total,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    stripeSessionId: session.id, // Add this field to your Payment model
  });
  await payment.save();

  // Set cart status to "processing"
  cart.status = 'processing';
  await cart.save();

  // 4) Create session as response
  res.status(200).json({
    status: 'success',
    session,
  });
});

exports.handlePaymentConfirmation = async (req, res) => {
  // After you received payment confirmation from Stripe
  const orderId = req.body.orderId; // Assuming orderId is sent in request body
  const paymentStatus = req.body.paymentStatus; // Assuming paymentStatus is sent in request body

  try {
    const order = await Order.findById(orderId);
    if (!order) {
      return res.status(404).json({
        status: 'fail',
        message: 'No order found with that ID',
      });
    }
    order.statusDelivery =
      paymentStatus === 'paid' ? 'processing' : 'cancelled';
    await order.save();

    res.status(200).json({
      status: 'success',
      data: {
        order,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
