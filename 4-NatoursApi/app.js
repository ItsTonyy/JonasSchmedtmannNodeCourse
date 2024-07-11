const express = require('express');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(express.json());

//app.get('/', (req, res) => {
//  res.status(202);
//  res.json({ message: 'Hello from the server side!', app: 'Natours' });
//});
//
//app.post('/', (req, res) => {
//  res.send('You can post to this endpoint')
//})

const tours = JSON.parse(fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`));

app.get('/api/v1/tours', (req, res) => {
  res.status(200);
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.get('/api/v1/tours/:id', (req, res) => {
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
});

app.post('/api/v1/tours', (req, res) => {
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
});

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
