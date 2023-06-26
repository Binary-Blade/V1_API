const validator = require('validator');

module.exports = (value) => validator.escape(value);
