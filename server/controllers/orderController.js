const Order = require('../models/Order');
const Cart = require('../models/CartModel');
const catchAsync = require('../utils/catchAsync');

exports.createOrder = async (req, res) => {
  const { products, trackingInfo, paymentInfo } = req.body;

  try {
    let newOrder = new Order({
      buyer: req.user.id,
      products,
      trackingInfo,
      paymentInfo,
      statusDelivery: 'placed', // Here is where you define the initial statusDelivery
    });

    newOrder = await newOrder.save();

    res.status(201).json({
      status: 'success',
      data: {
        order: newOrder,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'fail',
      message: error.message,
    });
  }
};
//... Rest of your order controller code

exports.getOrderDetails = catchAsync(async (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  const { cartId } = req.params;
  const { session_id } = req.query;
  const cart = await Cart.findById(cartId).populate('products.product');

  if (!cart) {
    return res.status(404).json({
      status: 'fail',
      message: 'No cart found with that ID',
    });
  }

  res.status(200).json({
    cartId,
    session_id,
    products: cart.products.map((p) => ({
      name: p.product.name,
      pricePerKg: p.product.pricePerKg,
      quantity: p.quantity,
    })),
    total: cart.total,
  });
});
