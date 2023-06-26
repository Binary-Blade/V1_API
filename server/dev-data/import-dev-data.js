const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Reviews = require('../models/reviewModel');
const Farm = require('../models/FarmModel');
const Buyer = require('../models/buyerModel');
// config
dotenv.config({ path: './config.dev.env' });

// Import the environment variables
const DB = process.env.DATABASE;

// Connect to MongoDB using Mongoose
mongoose
  .connect(DB, {
    useNewUrlParser: true, // Use the new MongoDB driver's Url Parser
    useUnifiedTopology: true, // Use the new topology engine of MongoDB driver
  })
  .then(() => console.log('Connexion MongoDB : OK')); // Log a successful connection

//read JSON file
const product = JSON.parse(
  fs.readFileSync(`${__dirname}/data/product.json`, 'utf-8')
);
const user = JSON.parse(
  fs.readFileSync(`${__dirname}/data/users.json`, 'utf-8')
);
const buyer = JSON.parse(
  fs.readFileSync(`${__dirname}/data/buyer.json`, 'utf-8')
);
const farm = JSON.parse(
  fs.readFileSync(`${__dirname}/data/farm.json`, 'utf-8')
);
const reviews = JSON.parse(
  fs.readFileSync(`${__dirname}/data/reviews.json`, 'utf-8')
);

//import data to database
// Helper function to import data without validation

const importData = async () => {
  try {
    // Insert multiple documents without stopping on errors
    await User.insertMany(user, { ordered: false });
    await Product.insertMany(product, { ordered: false });
    await Reviews.insertMany(reviews, { ordered: false });
    await Farm.insertMany(farm, { ordered: false });
    await Buyer.insertMany(buyer, { ordered: false });

    console.log('Data successfully loaded');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};
// DELETE ALL DATA FROM DATABASe

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Product.deleteMany();
    await Reviews.deleteMany();
    await Farm.deleteMany();
    await Buyer.deleteMany();
    console.log('Data successfully deleted');
  } catch (error) {
    console.log(error);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);
