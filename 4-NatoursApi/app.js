const express = require('express');

const app = express();
const port = 3000;

//app.get('/', (req, res) => {
//  res.status(202);
//  res.json({ message: 'Hello from the server side!', app: 'Natours' });
//});
//
//app.post('/', (req, res) => {
//  res.send('You can post to this endpoint')
//})

app.get('/api/v1/tours', (req,res) => {
  
}) 

app.listen(port, () => {
  console.log(`app running on port ${port}...`);
});
