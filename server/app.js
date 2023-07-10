// Express
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');

const cors = require('cors');

// Calling express
const app = express();

app.use(
  cors({
    origin: ['http://127.0.0.1:8000', 'http://localhost:5173'], // replace with the domains of your frontend applications
    credentials: true,
  })
);

// EXPORT
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');

// IMPORTING ROUTES
const adminRouter = require('./routes/adminRoutes');
const paymentRouter = require('./routes/paymentRoutes');
const userRouter = require('./routes/userRoutes');
const farmRouter = require('./routes/farmRoutes');
const productRouter = require('./routes/productRoutes');
const cartRouter = require('./routes/cartRoutes');
const reviewRouter = require('./routes/reviewRoutes');
const buyerRouter = require('./routes/buyerRoutes');

// 1) GLOBAL MIDDLEWARES
// SET SECURITY HTTP HEADERS
app.use(helmet());

// DEVELOPMENT LOGGING
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}
// SET LIMIT REQUESTS FROM SAME API
const limiter = rateLimit({
  max: 150, // Can be modified if the API is very use
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests from this IP, please try again in an hour!',
});
app.use('/api', limiter);

// BODY PARSER, READING DATA FROM BODY INTO REQ.BODY
app.use(express.json({ limit: '10kb' }));

// DATA SANITIZATION AGAINST NoSQL QUERY INJECTION
app.use(mongoSanitize());

// DATA SANITIZATION AGAINST XSS
app.use(xss());

// PREVENT PARAMETER POLLUTION - Should be used here because clear up query string
app.use(
  hpp({
    whitelist: ['duration', 'ratingsQuantity', 'ratingsAverage', 'price'],
  })
);

// SERVING STATIC FILES
app.use(express.static(`${__dirname}/public`));

// TEST MIDDLEWARE
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes use
app.use('/api_v1/payment', paymentRouter);
app.use('/api_v1/admin', adminRouter);
app.use('/api_v1/users', userRouter);
app.use('/api_v1/myaccount', buyerRouter);
app.use('/api_v1/farms', farmRouter);
app.use('/api_v1/products', productRouter);
app.use('/api_v1/cart', cartRouter);
app.use('/api_v1/reviews', reviewRouter);

// Then the catch-all middleware goes here
app.all('*', (req, res, next) => {
  next(new AppError(`can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
