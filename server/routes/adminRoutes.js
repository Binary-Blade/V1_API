const express = require('express');
const authController = require('../controllers/authController');
const farmController = require('../controllers/farmController');
const adminController = require('../controllers/adminController');

const router = express.Router();

router.use(authController.protect, authController.restrictTo('admin'));
// ADMIN ROUTING
router.route('/').get(adminController.getAllUsersAsAdmin);
router
  .route('/:id')
  .post(farmController.createFarmPage)
  .patch(adminController.updateOneUser)
  .delete(adminController.deleteOneUser);

module.exports = router;
