const fs = require('fs');
const superagent = require('superagent');

fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
  console.log(`breed: ${data}`);

  superagent
    .get(`https://dog.ceo/api/breed/${data}/images/random`)
    .then((res) => {
      console.log('image received: ', res.body.message);

      fs.writeFile('dog-img.txt', res.body.message, (error) => {
        if (error) {
          console.log('Error while trying to write file: ', error);
        }

        console.log('file written!');
      });
    })
    .catch((error) => {
      console.log(error.message);
    });
});
