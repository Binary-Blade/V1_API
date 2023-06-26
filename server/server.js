const mongoose = require('mongoose');
const dotenv = require('dotenv');

// UNCAUGHT EXCEPTION ERROR
process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION! 💀');
  console.log(err);
  process.exit(1);
});

if (process.env.NODE_ENV === 'production') {
  dotenv.config({ path: './config.prod.env' });
} else {
  dotenv.config({ path: './config.dev.env' });
}
const app = require('./app');
// Import the environment variables
const DB = process.env.DATABASE;

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true, // Use the new MongoDB driver's Url Parser
    useUnifiedTopology: true, // Use the new topology engine of MongoDB driver
  })
  .then(() => console.log('Connexion MongoDB : OK')); // Log a successful connection

////////////////
const port = process.env.PORT;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLER REJECTION! 💀');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
