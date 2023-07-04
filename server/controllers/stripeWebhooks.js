const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const Product = require('../models/ProductModel');
const Farm = require('../models/FarmModel');

exports.handleCheckoutSessionCompleted = async (session) => {
  // Récupérer le produit lié à la session
  const product = await Product.findById(
    session.line_items[0].metadata.productId
  );

  // Récupérer le fermier lié au produit
  const farm = await Farm.findById(product.farm);

  // Créer un transfert Stripe vers le compte du fermier
  const transfer = await stripe.transfers.create({
    amount: session.amount_total,
    currency: 'usd',
    destination: farm.stripeAccountId,
  });

  // Update Payment and Cart status
  const payment = await Payment.findOne({ stripeSessionId: session.id });
  payment.paymentStatus = 'completed';
  await payment.save();

  const cart = await Cart.findById(payment.order);
  cart.status = 'completed';
  await cart.save();
};
