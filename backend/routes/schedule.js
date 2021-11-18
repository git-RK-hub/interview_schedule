const express = require('express');
const scheduleController = require('../controllers/schedule');

const router = express.Router();

router
  .route('/')
  .get(scheduleController.getAll)
  .post(scheduleController.checkAvailabilty, scheduleController.createOne);

router
  .route('/:id')
  .get(scheduleController.getOne)
  .delete(scheduleController.deleteOne)
  .patch(scheduleController.checkAvailabilty, scheduleController.updateOne);

module.exports = router;
