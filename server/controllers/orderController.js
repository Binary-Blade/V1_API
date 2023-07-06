const Order = require('../models/Order');
const catchAsync = require('../utils/catchAsync');

// exports.createOrder = async (req, res) => {
//   const { products, trackingInfo, paymentInfo } = req.body;

//   try {
//     let newOrder = new Order({
//       buyer: req.user.id,
//       products,
//       trackingInfo,
//       paymentInfo,
//       statusDelivery: 'placed', // Here is where you define the initial statusDelivery
//     });

//     newOrder = await newOrder.save();

//     res.status(201).json({
//       status: 'success',
//       data: {
//         order: newOrder,
//       },
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'fail',
//       message: error.message,
//     });
//   }
// };
//... Rest of your order controller code

/*exports.getOrderDetails = catchAsync(async (req, res) => {
  console.log('req.params:', req.params);
  console.log('req.query:', req.query);
  const { orderId } = req.params;
  const { session_id } = req.query;
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
    products: order.products.map((p) => ({
      name: p.product.name,
      price: p.product.price,
      quantity: p.quantity,
    })),
    total: order.total,
  });
}); */
