// const fs = require('fs');
const Tour = require('../models/tourModel');

// const tours = JSON.parse(
//   fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`)
// );

// This is middleware, checking if the ID is valid
// exports.checkID = (req, res, next, val) => {
//   console.log(`Tour id is: ${val}`);

//   if (req.params.id * 1 > tours.length) {
//     return res.status(404).json({
//       // This return will halt going into next() and end req/res cycle
//       status: 'fail',
//       message: 'Invalid ID',
//     });
//   }
//   next();
// };

// exports.checkBody = (req, res, next) => {
//   if (!req.body.name || !req.body.price) {
//     // If the price or name is missing, status 400
//     return res.status(400).json({
//       status: 'fail', // status fail is given for 400
//       message: 'Missing name or price',
//     });
//   }
//   next();
// };

exports.getAllTours = async (req, res) => {
  try {
    //.find will return an array of all the tours, and convert to JSON
    const tours = await Tour.find();

    console.log(req.requestTime);
    res.status(200).json({
      status: 'success',
      // Using the requestTime middleware
      // requestTime: req.requestTime,
      results: tours.length,
      data: {
        tours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getTour = (req, res) => {
  console.log(req.params);
  const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
  // res.status(200).json({
  //   status: 'success',
  //   data: {
  //     tour,
  //   },
  // });
};

exports.createTour = async (req, res) => {
  // const newTour = new Tour({});
  // newTour.save()
  try {
    const newTour = await Tour.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data sent!',
    });
  }

  // console.log(req.body);
  //Always need to send back something to complete request response cycle
  // const newId = tours[tours.length - 1].id + 1;
  // const newTour = Object.assign({ id: newId }, req.body);
  // tours.push(newTour);
  // fs.writeFile(
  //   `${__dirname}/dev-data/data/tours-simple.json`,
  //   JSON.stringify(tours),
  //   (err) => {
  //     // status code 200 is OK, status 201 means created
  //     res.status(201).json({
  //       status: 'success',
  //       data: {
  //         tour: newTour,
  //       },
  //     });
  //   }
  // );
};

exports.updateTour = (req, res) => {
  // It is standard REST practice to send the updated item
  // back
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Updated Tour Here...>',
    },
  });
};

exports.deleteTour = (req, res) => {
  //204 status is for no content, no data gets sent back
  res.status(204).json({
    status: 'success',
    data: null, // No data sent back
  });
};
