// Mongoose models are created out of schemas
const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

// Model is the best place for data validation
const tourSchema = new mongoose.Schema(
  {
    name: {
      // Schema type properties
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      // Only for strings
      maxlength: [40, 'A tour name must have less or equal then 40 characters'],
      minlength: [10, 'A tour name must have more or equal then 10 characters'],
      // validate: [validator.isAlpha, 'Tour name must only contain characters'], // Spaces won't work with isAlpha
    },
    slug: String,
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
      enum: {
        // This is only for strings
        values: ['easy', 'medium', 'difficult'],
        message: 'Difficulty is either: easy, medium, difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // This only works with creation of NEW documents
          return val < this.price; // If this is false then a validator error will be thrown
        },
        message: 'Discount price ({VALUE}) must be below regular price',
      },
    },
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
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false, // This will hide it from the output
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual properties are properties that are not stored in the database, but are computed from other properties
tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE, runs before .save() and .create(). Doesn't run for insertMany() or findByIdAndUpdate() etc.
// Pre-document middleware (HOOK is the same as middleware)
tourSchema.pre('save', function (next) {
  // console.log(this);
  this.slug = slugify(this.name, { lower: true });
  next();
});

// Can run multiple pre middleware functions
// tourSchema.pre('save', function (next) {
//   console.log('Will save document...');
//   next();
// });

// Post-document middleware - executed after pre middleware
// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE - runs before .find() and .findOne()
tourSchema.pre(/^find/, function (next) {
  // /^find/ is a regular expression that matches the beginning of the string that starts with find
  this.find({ secretTour: { $ne: true } });
  this.start = Date.now();
  next();
});

// This post middleware runs after the query has executed
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now() - this.start} milliseconds`);
  next();
});

// AGGREGATION MIDDLEWARE - runs before .aggregate()
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } }); // Unshift adds to the beginning of the array, Shift adds to the end
  next();
});

// Uppercase for model names and variables
// This is a model created using tourSchema schema
const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
