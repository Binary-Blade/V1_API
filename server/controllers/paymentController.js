const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Payment = require('../models/Payment');
const catchAsync = require('../utils/catchAsync');
const paymentServices = require('../services/paymentServices');
const Order = require('../models/Order');

exports.generateCheckoutSession = catchAsync(async (req, res, next) => {
  const { cartId } = req.params;
  const { id: userId } = req.user;
  const { cart, productData } = await paymentServices.processCart(cartId);

  const order = await paymentServices.createOrder({
    cart,
    productData,
    buyerId: userId,
  });

  const lineItems = cart.products.map((product) => {
    const productDetails = productData[product.product.toString()];

    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: productDetails.name,
          description: productDetails.description,
          metadata: {
            productId: product.product.toString(),
          },
        },
        unit_amount: Math.round(product.price * 100), // Stripe expects amounts in cents
      },
      quantity: product.quantity,
    };
  });

  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/api_v1/payment/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
  });

  const newPayment = new Payment({
    user: userId,
    order: order._id,
    amount: stripeSession.amount_total,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    stripeSessionId: stripeSession.id,
  });
  await newPayment.save();

  cart.status = 'processing';
  await cart.save();

  res.status(200).json({
    status: 'success',
    session: stripeSession.id,
    order: order._id,
  });
});

exports.handleSuccess = catchAsync(async (req, res) => {
  const { session_id: sessionId } = req.query;

  const stripeSession = await stripe.checkout.sessions.retrieve(sessionId);

  if (!stripeSession) {
    return res.status(404).json({
      status: 'fail',
      message: 'No stripe session found with that ID',
    });
  }

  const payment = await Payment.findOne({ stripeSessionId: sessionId });

  if (!payment) {
    return res.status(404).json({
      status: 'fail',
      message: 'No payment found with that stripe session ID',
    });
  }

  payment.paymentStatus = stripeSession.payment_status;
  await payment.save();

  const order = await Order.findById(payment.order);
  if (!order) {
    return res.status(404).json({
      status: 'fail',
      message: 'No order found with that ID',
    });
  }

  order.paymentInfo.status =
    stripeSession.payment_status === 'paid' ? 'processing' : 'cancelled';

  await order.save();

  res.status(200).json({
    status: 'success',
    data: {
      order,
      payment,
    },
    orderDetails: order,
  });
});
