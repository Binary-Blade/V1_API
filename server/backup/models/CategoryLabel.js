const categorySchema = {
  type: String,
  required: [true, 'Please provide the product category'],
  enum: {
    values: ['vegetable', 'fruit', 'meat'],
    message: 'Category must be either: vegetable, fruit, or meat',
  },
};

const labelSchema = {
  type: String,
  required: [true, 'Please provide label(s) for the farmer'],
  enum: {
    values: [
      'Euro-Leaf',
      'EU-Red Label',
      'PGI',
      'Organic',
      'PDO',
      'TSG',
      'PGI',
      'ASC',
      'RainForest Alliance',
    ],
    message: 'Label must be one of the specified values',
  },
};

module.exports = {
  categorySchema,
  labelSchema,
};
