const express = require('express');
const morgan = require('morgan');

const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// 1) MIDDLEWARE

// Middleware that can modify incoming requests, incoming requests go through this
// Middleware is used to manipulate request or response objects, mostly request.
// express.json() accesses the request object. In express everything including routes
// are middleware functions, executed only for certain routes.
// Middleware stack, FIFO - Order as defined in the code. First Middleware is executed first
// Each Middleware function has a next() that calls the next Middleware and send req and res
// objects through each of the middleware. The last middleware is usually a route handler
// that send a response instead of calling next()

app.use(morgan('dev')); // morgan will log requests
app.use(express.json()); // parse the data from the body
app.use(express.static(`${__direname}/public`));

// This middleware is applied to every request, since no route specified
// If middleware is after a certain route, it may not get executed if one of the
// routes end the request response cycle.
// req, res, next is a signature of middleware functions
app.use((req, res, next) => {
  console.log('Hello from the middleware 👋');
  // It is important to call next in middleware to prevent the stack from breaking
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// 3) ROUTES

// Refactored
// app.get('/api/v1/tours', getAllTours);
// app.post('/api/v1/tours', createTour);
// app.get('/api/v1/tours/:id', getTour);
// app.patch('/api/v1/tours/:id', updateTour);
// app.delete('/api/v1/tours/:id', deleteTour);

// Create a new Router

app.use('/api/v1/tours', tourRouter); // Use the specific middleware function tourRouter for /api/v1/tours route specifically
app.use('/api/v1/users', userRouter); // This is calle