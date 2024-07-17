const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

exports.checkId = (req, res, next, val) => {
  const id = req.params.id * 1;
  console.log(`the tour id is: ${val}`);

  if (id > tours.length - 1) {
    res.status(404);
    return res.json({
      status: 'fail',
      message: `can't find tour with id of ${id}`,
    });
  }
  next();
};

exports.getAllTours = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

exports.getTourByid = (req, res) => {
  const id = req.params.id * 1;

  res.status(200);
  res.json({
    status: 'success',
    data: {
      tour: tours[id],
    },
  });
};

exports.createTour = (req, res) => {
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  tours.push(newTour);

  fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), (err) => {
    res.status(201);
    res.json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  });
};

exports.uptadeTour = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
};

exports.deleteTour = (req, res) => {
  res.status(204);
  res.json({
    status: 'success',
    data: null,
  });
};