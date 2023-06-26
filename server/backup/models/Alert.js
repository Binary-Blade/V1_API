const mongoose = require('mongoose');
const validator = require('validator');

const { Schema } = mongoose.Schema;

const alertSchema = new Schema({
  name: {
    type: String,
    validator: [validator.isAlpha, 'Name must only contain characters'],
  },
  description: String,
  category: String,
  stock: Number,
  farmerId: Schema.Types.ObjectId,
});

const Alert = mongoose.model('Alert', alertSchema);
module.exports = Alert;
