const express = require('express');
const userController = require('../controllers/users');

const router = express.Router();

router
  .route('/')
  .get(userController.getAll)
  .post(userController.createOne);

router
  .route('/:id')
  .get(userController.getOne)
  .delete(userController.deleteOne)
  .patch(userController.updateOne);

module.exports = router;
