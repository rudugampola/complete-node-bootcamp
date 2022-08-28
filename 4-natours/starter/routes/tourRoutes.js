const express = require('express');
const tourController = require('./../controllers/tourController');
const router = express.Router(); // Tour Router middleware

router
  .route('/top-5-cheap')
  .get(tourController.aliasTopTours, tourController.getAllTours);

router.route('/tour-stats').get(tourController.getTourStats);
router.route('/monthly-plan/:year').get(tourController.getMonthlyPlan);

// This is middleware too, runs when the id is in the route
// router.param('id', tourController.checkID);

// Why run multiple middlewares? Check the id coming in to see if valid before running
// another middleware
router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour); // Chaining multiple middleware handlers in the same route

router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
