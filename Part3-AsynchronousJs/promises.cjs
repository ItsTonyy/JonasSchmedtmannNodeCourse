const fs = require('fs');
const superagent = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) {
        reject('❌ Error: File not found.');
      }
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) {
        reject('❌ Error: Could not write file.');
      }
      resolve(data);
    }); 
  });
};

readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`breed: ${data}`);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    console.log('image received: ', res.body.message);
    writeFilePro('dog-img.txt', res.body.message); 
  })
  .then(() => {
    console.log('Random dog image save to file.')
  })
  .catch((error) => {
    console.log(error);
  });
