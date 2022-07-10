const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router(); // Tour Router middleware

// This is middleware too, runs when the id is in the route
router.param('id', tourController.checkID);

// Why run multiple middlewares? Check the id coming in to see if valid before running
// another middleware
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.checkBody, tourController.createTour); // Chaining multiple middleware handlers in the same route

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
