const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel.js');
const Order = require('../models/Order');
const Payment = require('../models/Payment');
const catchAsync = require('../utils/catchAsync');

exports.generateCheckoutSession = catchAsync(async (req, res, next) => {
  const cartId = req.params.cartId;
  const cart = await Cart.findById(cartId);

  // Return error if cart does not exist
  if (!cart) {
    return res.status(404).send({ error: 'Cart not found' });
  }

  // Return error if cart is empty
  if (cart.products.length === 0) {
    return res.status(400).json({
      status: 'fail',
      message: 'No products in cart',
    });
  }

  // Fetch product data for each product in the cart
  const productIds = cart.products.map((product) => product.product);
  const products = await Product.find({ _id: { $in: productIds } });

  // Create a map of product ID to product data for easy access
  const productData = products.reduce((map, product) => {
    map[product._id.toString()] = product;
    return map;
  }, {});

  let totalPrice = 0;
  cart.products.forEach((product) => {
    const productDetails = productData[product.product.toString()];
    console.log('productDetails.price:', productDetails.pricePerKg);
    totalPrice += productDetails.pricePerKg * product.quantity;
  });

  // Arrondir le total à deux décimales
  totalPrice = parseFloat(totalPrice.toFixed(2));

  // Create order from the cart
  const order = await Order.create({
    buyer: req.user.id,
    products: cart.products,
    totalPrice: totalPrice,
    statusDelivery: 'placed',
    paymentInfo: {
      type: 'stripe',
      status: 'pending',
    },
  });

  // Convert each product in the cart to a Stripe line item
  const lineItems = cart.products.map((product) => {
    const productDetails = productData[product.product.toString()];
    console.log('product.price:', product.price);
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
  console.log(JSON.stringify(cart.products, null, 2));

  // Create a checkout session with Stripe
  const stripeSession = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${req.protocol}://${req.get(
      'host'
    )}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${req.protocol}://${req.get('host')}/cancel`,
  });

  // Create a new payment record
  const newPayment = new Payment({
    user: req.user.id,
    order: order._id,
    amount: stripeSession.amount_total,
    paymentMethod: 'stripe',
    paymentStatus: 'pending',
    stripeSessionId: stripeSession.id,
  });
  await newPayment.save();

  // Set cart status to "processing"
  cart.status = 'processing';
  await cart.save();

  // Send back the session ID and order ID
  res.status(200).json({
    status: 'success',
    session: stripeSession.id,
    order: order._id,
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
