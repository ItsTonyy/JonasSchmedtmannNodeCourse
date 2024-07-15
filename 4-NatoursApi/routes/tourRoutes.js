const express = require('express');
const {
  createTour,
  deleteTour,
  getAllTours,
  getTourByid,
  uptadeTour,
  checkId
} = require('./../controllers/tourController');

const router = express.Router();

router.param('id', checkId);

router.route('/').get(getAllTours).post(createTour);

router.route('/:id').get(getTourByid).patch(uptadeTour).delete(deleteTour);

module.exports = router;
