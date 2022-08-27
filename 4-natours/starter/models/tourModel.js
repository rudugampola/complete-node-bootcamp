// Mongoose models are created out of schemas
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    // Schema type properties
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
});

// Uppercase for model names and variables
// This is a model created using tourSchema schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
