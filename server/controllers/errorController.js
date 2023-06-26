// IMPORTING REQUIRED MODULE
const AppError = require('../utils/appError');

// SPECIFIC DATABASE ERROR HANDLERS
// Handles cast errors that come from mongoose. These occur when trying to search for a wrong unique id in DB.
const handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}`; // We construct a message using the error path and value.
  return new AppError(message, 400); // We create a new AppError with our custom message and a status code of 400 for Bad Request.
};

// Handles duplicate fields errors in MongoDB.
const handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(?:(?=(\\?))\2.)*?\1/)[0]; // Using regex to extract the value causing duplicate key error from error message.
  const message = `Duplicate fields value: ${value}. Please use another value !`;
  return new AppError(message, 400);
};

// Handles validation errors that come from mongoose.
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message); // Extracting just the messages of the errors
  const message = `Invalided input data. ${errors.join('. ')}`;
  return new AppError(message, 400);
};

const handleJWTError = () =>
  new AppError('Invalid Token. Please log in again!', 401);

const handleJWTExpiredError = () =>
  new AppError('Your token has expired . Please log in again!', 401);

// ERROR RESPONSE FOR DEVELOPMENT ENVIRONMENT
// This function sends errors during development. More verbose to help in debugging.
const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack, // Error stack is sent only during development. It is useful for debugging.
  });
};

// ERROR RESPONSE FOR PRODUCTION ENVIRONMENT
// This function sends errors during production. Less verbose for security and user friendliness.
const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    // If the error is operational, it's safe to send the message to the client.
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    // If error is not operational or an unknown error, we don't want to leak details to the client.
    console.error('ERROR 💥', err); // We log error for developers.
    res.status(500).json({
      // A generic message is sent to the client.
      status: 'error',
      message: 'Something went very wrong',
    });
  }
};

// GLOBAL ERROR-HANDLING MIDDLEWARE
// This is a global error-handling middleware function. All errors in the application will go through this function.
module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500; // If no status code is on the error, set it to 500 (server error).
  err.status = err.status || 'error'; // If no status is on the error, set it to 'error'.

  // Depending on the environment, handle the error accordingly.
  if (process.env.NODE_ENV === 'development') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'production') {
    let error = Object.create(err);

    if (error.name === 'CastError') error = handleCastErrorDB(error); // Handler for CastError
    if (error.code === 11000) error = handleDuplicateFieldsDB(error); // Handler for duplicate fields
    if (error.name === 'ValidationError')
      error = handleValidationErrorDB(error);

    if (error.name === 'JsonWebTokenError') error = handleJWTError();
    if (error.name === 'TokenExpiredError') error = handleJWTExpiredError();

    sendErrorProd(error, res);
  }
};
