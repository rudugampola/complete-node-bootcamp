// Mongoose models are created out of schemas
const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    // Schema type properties
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A tour must have a duration'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A tour must have a group size'],
  },
  difficulty: {
    type: String,
    required: [true, 'A tour must have a difficulty'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A tour must have a summary'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String, // String reference to the image in file system
    required: [true, 'A tour must have a cover image'],
  },
  images: [String], // Array of strings, each string is a reference to an image in file system
});

// Uppercase for model names and variables
// This is a model created using tourSchema schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
