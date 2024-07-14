const express = require('express');
const {createTour, deleteTour, getAllTours, getTourByid, uptadeTour} = require('./../controllers/tourController')
const router = express.Router();

router.route('/')
  .get(getAllTours)
  .post(createTour);

router.route('/:id')
  .get(getTourByid)
  .patch(uptadeTour)
  .delete(deleteTour);

module.exports = router;
