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
      resolve();
    });
  });
};

const getDogPic = async () => {
  try {
    const dogName = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${dogName}`);

    const image = await superagent.get(`https://dog.ceo/api/breed/${dogName}/images/random`);
    console.log('image received: ', image.body.message);

    await writeFilePro('dog-img.txt', image.body.message).then(console.log('File Written Successfully!'));
  } catch (error) {
    console.log('Error in getDogPic function: ', error);
  }
};

getDogPic();
