const Cart = require('../models/CartModel');
const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.addToCart = catchAsync(async (req, res, next) => {
  // Find cart by user, or create one if none found
  let cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    cart = await Cart.create({ user: req.user.id });
  }

  // Check if product is already in cart, increment quantity if so
  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === req.body.product
  );

  if (productIndex > -1) {
    if (
      cart.products[productIndex] &&
      typeof cart.products[productIndex].quantity === 'number'
    ) {
      // eslint-disable-next-line no-plusplus
      cart.products[productIndex].quantity++;
    } else {
      // Handle case when the product doesn't exist or quantity is not a number.
      console.error('Product does not exist or quantity is not a number');
    }
  } else {
    // Otherwise, add new product to cart
    cart.products.push({ product: req.body.product, quantity: 1 });
  }

  await cart.save();

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.getCart = catchAsync(async (req, res, next) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate(
    'products.product'
  );
  console.log(req.user.id);

  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      cart,
    },
  });
});

exports.deleteProductFromCartById = catchAsync(async (req, res, next) => {
  // Find the cart by user ID
  const cart = await Cart.findOne({ user: req.user.id });

  if (!cart) {
    return next(new AppError('No cart found for this user', 404));
  }

  // Find the index of the product in the cart
  const productIndex = cart.products.findIndex(
    (item) => item.product.toString() === req.params.productId
  );

  if (productIndex === -1) {
    return next(new AppError('No product found in the cart', 404));
  }

  // Remove the product from the cart
  cart.products.splice(productIndex, 1);

  // If the cart is empty, delete it
  if (cart.products.length === 0) {
    await Cart.findByIdAndDelete(cart.id);
    return res.status(204).json({
      status: 'success',
      data: null,
      message: 'Cart is empty and has been deleted',
    });
  }

  await cart.save();

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
