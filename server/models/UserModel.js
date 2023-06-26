const crypto = require('crypto');
const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
// const Farm = require('./FarmModel');

const userSchema = new mongoose.Schema({
  //TODO Make a username for everyone, buyers can stay with the username not the farmers
  name: {
    type: String,
    required: [true, 'Please tell us your name'],
  },
  email: {
    type: String,
    required: [true, 'Please tell us your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  photo: String,
  // PASSWORD
  // -------------------
  password: {
    type: String,
    minlength: 8,
    select: false,
  },
  passwordConfirm: {
    type: String,
  },
  passwordChangedAt: Date,
  password_HashedResetToken: String,
  password_HashedResetExpires: Date,
  // STATUS
  // ----------------
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  createdBy: String,
  // ROLE
  role: {
    type: String,
    enum: ['buyer', 'farmer', 'admin'],
    default: 'buyer',
  },
  // CHILD REFERENCE FARM
  farm: {
    type: mongoose.Schema.ObjectId,
    ref: 'Farm',
  },
  // CHILD REFERENCE BUYER
  buyer: {
    type: mongoose.Schema.ObjectId,
    ref: 'Buyer',
  },
});

userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
// ENCRYPTION PASSWORDS
userSchema.pre('save', async function (next) {
  // Only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  // Hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);
  // Delete passwordConfirm
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email: email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    throw new Error('Incorrect email or password');
  }

  return user;
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  this.password_HashedResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.password_HashedResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
