const Cart = require('../models/CartModel');
const Product = require('../models/ProductModel.js');
const Order = require('../models/Order');
const Payment = require('../models/Payment');

// Error messages
const ERRORS = {
  CART_NOT_FOUND: 'Cart not found',
  EMPTY_CART: 'No products in cart',
};

exports.processCart = async (cartId) => {
  const cart = await Cart.findById(cartId);
  if (!cart) {
    throw new Error(ERRORS.CART_NOT_FOUND);
  }
  if (cart.products.length === 0) {
    throw new Error(ERRORS.EMPTY_CART);
  }
  const productIds = cart.products.map((product) => product.product);
  const products = await Product.find({ _id: { $in: productIds } });

  const productData = products.reduce((map, product) => {
    map[product._id.toString()] = product;
    return map;
  }, {});

  return { cart, productData };
};

exports.createOrder = async ({ cart, productData, buyerId }) => {
  let totalPrice = 0;
  cart.products.forEach((product) => {
    const productDetails = productData[product.product.toString()];
    totalPrice += productDetails.pricePerKg * product.quantity;
  });
  totalPrice = parseFloat(totalPrice.toFixed(2));
  return await Order.create({
    buyer: buyerId,
    products: cart.products,
    totalPrice: totalPrice,
    statusDelivery: 'placed',
    paymentInfo: {
      type: 'stripe',
      status: 'pending',
    },
  });
};
