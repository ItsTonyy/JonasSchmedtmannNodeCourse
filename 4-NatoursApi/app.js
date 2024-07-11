const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

const getAllTours = (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
};

const getTourByid = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length - 1) {
    res.status(404);
    res.json({
      status: 'fail',
      message: `can't find tour with id of ${id}`,
    });
  }

  res.status(200);
  res.json({
    status: 'success',
    data: {
      tour: tours[id],
    },
  });
}

const createTour = (req, res) => {
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
}

const uptadeTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length - 1) {
    res.status(404);
    res.json({
      status: 'fail',
      message: `can't find tour with id of ${id}`,
    });
  }

  res.status(200);
  res.json({
    status: 'success',
    data: {
      tour: '<updated tour here>',
    },
  });
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1;

  if (id > tours.length - 1) {
    res.status(404);
    res.json({
      status: 'fail',
      message: `can't find tour with id of ${id}`,
    });
  }

  res.status(204);
  res.json({
    status: 'success',
    data: null,
  });
}

app.get('/api/v1/tours', getAllTours);

app.get('/api/v1/tours/:id', getTourByid);

app.post('/api/v1/tours', createTour);

app.patch('/api/v1/tours/:id', uptadeTour);

app.delete('/api/v1/tours/:id', deleteTour);

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
