const express = require('express');
const farmController = require('../controllers/farmController');
const authController = require('../controllers/authController');

const router = express.Router();

//ROUTER FARMER PRODUCT

router.use(authController.protect);

// ROUTE GET PAGE FARMER
router.route('/').get(farmController.getAllFarms);
router.route('/:id').get(farmController.getFarm);
// Add the new route for getting farms within a certain distance
router
  .route('/farms-within/:distance/center/:latlng/unit/:unit')
  .get(farmController.getFarmWithin);

router.route('/distances/:latlng/unit/:unit').get(farmController.getDistances);

router.use(authController.restrictTo('admin', 'farmer'));
router
  .route('/gestion-product')
  .post(farmController.createProduct)
  .delete(farmController.deleteProduct);

router
  .route('/gestion-product/:id')
  .patch(farmController.updateProduct)
  .delete(farmController.deleteProduct);

// ROUTER PAGE FARMER
router
  .route('/farm-page/:id')
  .get(farmController.getAllMyProducts)
  .patch(farmController.updateFarmPage)
  .delete(farmController.deleteFarmPage);

module.exports = router;
