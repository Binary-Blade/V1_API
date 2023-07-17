// Import necessary packages
const crypto = require('crypto');
const { promisify } = require('util'); // Utility to transform callback-based functions to promises
const jwt = require('jsonwebtoken'); // Package for handling JWT (JSON Web Tokens)
const AppError = require('../utils/appError'); // Custom Error handling class
const User = require('../models/UserModel'); // Mongoose User model
const Buyer = require('../models/buyerModel');
const Farmer = require('../models/FarmModel');
const catchAsync = require('../utils/catchAsync'); // Utility function to catch asynchronous errors
const sendEmail = require('../utils/email'); // Utility function to send emails

// Function to sign a JWT with the user's ID
const signToken = function (id) {
  return jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

// Function to send a response with the signed token in Cookie
const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true;
  res.cookie('jwt', token, cookieOptions);
  // remove password from the output
  user.password = undefined;
  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};
// Route handler for signup
exports.signup = catchAsync(async (req, res, next) => {
  let newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    passwordChangedAt: req.body.passwordChangedAt,
    role: req.body.role,
  });

  if (newUser.role === 'buyer') {
    newUser = await Buyer.create({
      _id: newUser._id,
      createdBy: newUser._id,
    });
    await newUser.save({ validateBeforeSave: false });
  } else if (newUser.role === 'farmer') {
    newUser = await Farmer.create({
      _id: newUser._id,
      createdBy: newUser._id,
    });
    await newUser.save({ validateBeforeSave: false });
  }

  createSendToken(newUser, 201, res);
});

exports.completeRegistration = catchAsync(async (req, res, next) => {
  if (!req.user) {
    return next(new AppError('User not authenticated', 401));
  }
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  let updatedUser;
  if (user.role === 'buyer') {
    updatedUser = await Buyer.findByIdAndUpdate(user.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else if (user.role === 'farmer') {
    // if (!req.body.numSIREN) {
    //   return next(new AppError('SIREN number is required', 400));
    // }
    updatedUser = await Farmer.findByIdAndUpdate(user.id, req.body, {
      new: true,
      runValidators: true,
    });
  } else {
    return next(new AppError('Invalid role', 400));
  }

  res.status(200).json({
    status: 'success',
    message: 'Registration completed',
    data: {
      user: updatedUser,
    },
  });
});
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  // ...
});
// Route handler for login
exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided in request
  if (!email || !password) {
    return next(new AppError('Please provide email and password', 400));
  }

  const user = await User.findOne({ email: email }).select('+password');

  // Check if user exists and password is correct
  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  createSendToken(user, 200, res); // Send token upon successful login
});

// Middleware to protect routes
exports.protect = catchAsync(async (req, res, next) => {
  let token;
  // Check if token is provided in request headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  }
  if (!token) {
    console.log('No token found');
    return next(
      new AppError('You are not logged in! Please log in to get access', 401)
    );
  }

  // Verify the token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Check if the user still exists
  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    console.log('User not found');
    return next(
      new AppError(
        'The user belonging to this token does no longer exist.',
        401
      )
    );
  }

  // Check if the user changed their password after the token was issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    console.log('Password changed');
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  // Grant access to the protected route
  req.user = currentUser;
  console.log('User authenticated');
  next();
});

// Middleware to restrict actions to certain roles
exports.restrictTo = function (...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action'),
        403
      );
    }
    next();
  };
};

// Route handler for forgot password
exports.forgotPassword = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with email address.', 404));
  }

  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password ? Submit a PATCH request with your new password and passwordConfirm to : ${resetUrl}. \n if you didn't forget your password, please ignore this email`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token (valid for 10min)',
      message,
    });
    res.status(200).json({
      status: 'success',
      message: 'Token send to email',
    });
  } catch (err) {
    user.password_HashedResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        'There was an error sending the email. Try again later!',
        500
      )
    );
  }
});

// Route handler for resetting password
exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    password_HashedResetToken: hashedToken,
    password_HashedResetExpires: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError('Token is invalid or has expired', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.password_HashedResetToken = undefined;
  user.password_HashedResetExpires = undefined;

  await user.save();

  createSendToken(user, 200, res);
});

// Route handler for updating password
exports.updatePassword = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Wrong password!', 400));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});
