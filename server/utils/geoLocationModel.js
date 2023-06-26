const geoLocationSchema = {
  type: {
    type: String,
    default: 'Point',
    enum: ['Point'],
  },
  coordinates: {
    type: [Number],
    default: [0, 0],
  },
  address: {
    street: {
      type: String,
    },
    city: {
      type: String,
    },
    state: {
      type: String,
    },
    zipCode: {
      type: String,
    },
    country: {
      type: String,
    },
  },
};

module.exports = geoLocationSchema;
