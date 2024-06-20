const fs = require('fs');

// Blocking, Synchronous Way
const textIn = fs.readFileSync('./starter/txt/input.txt', 'utf-8');
//console.log(textIn)

const textOut = `This is what we know about the avocado: ${textIn}\nCreated on ${Date.now()}`;
fs.writeFileSync('./starter/txt/input.txt', textOut);
//console.log('file written!')

// Non-blocking, Asynchronous way
fs.readFile('./starter/txt/starttttt.txt', 'utf-8', (err, data1) => {
  if (err) return console.log('Error!');
  fs.readFile(`./starter/txt/${data1}.txt`, 'utf-8', (err, data2) => {
    if (err) return console.log('Error!');
    console.log(data2);
    fs.readFile('./starter/txt/append.txt', 'utf-8', (err, data3) => {
      if (err) return console.log('Error!');
      console.log(data3);

      fs.writeFile('./starter/txt/final.txt', `${data2}\n${data3}`, 'utf-8', (err) => {
        console.log('your file has been written.');
      });
    });
  });
});
console.log('reading file...');

// callback hell tho