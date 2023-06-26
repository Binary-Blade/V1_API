const mongoose = require('mongoose');

const { Schema } = mongoose.Schema;

// Event Schema
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  category: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  attendees: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;
