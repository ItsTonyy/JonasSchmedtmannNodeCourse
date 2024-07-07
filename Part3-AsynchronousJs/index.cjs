const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`breed: ${data}`);

  superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((error, res) => {
    if (error) {
      console.log('Error in the get method: ', error.message);
      return;
    }

    fs.writeFile('dog-img.txt', res.body.message, (error) => {
      console.log('file written!');
    });
  });
});
