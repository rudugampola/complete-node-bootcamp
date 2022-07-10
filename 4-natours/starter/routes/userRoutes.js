const express = require('express');

const userController = require('./../controllers/userController');

// router is commonly used terminology
const router = express.Router(); // User Router middleware

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
