const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

// 3) ROUTES
const router = express.Router();

router.post('/signup', authController.signup);

router.post('/login', authController.login);
router.post('/forgotPassword', authController.forgotPassword);
router.patch('/resetPassword/:token', authController.resetPassword);

router.use(authController.protect);
router.patch('/completeRegistration', authController.completeRegistration);

router.patch('/updatePassword', authController.updatePassword);

router.get('/me', userController.getMe, userController.getUser);
router.patch('/updateMe', userController.updateMe);
router.delete('/deleteMe', userController.deleteMe);

module.exports = router;
