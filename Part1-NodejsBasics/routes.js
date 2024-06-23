import http from 'node:http';
import url from 'node:url';
import * as fs from 'node:fs';

const slugify = require('slugify');

const templateOverview = fs.readFileSync('./starter/templates/template-overview.html', 'utf-8');
const templateProduct = fs.readFileSync('./starter/templates/template-product.html', 'utf-8');
const templateCard = fs.readFileSync('./starter/templates/template-card.html', 'utf-8');

const data = fs.readFileSync('./starter/dev-data/data.json', 'utf-8');
const dataObject = JSON.parse(data);

const replaceTemplate = (template, product) => {
  let output = template.replace(/{%PRODUCTNAME%}/g, product.productName);
  output = output.replace(/{%IMAGE%}/g, product.image);
  output = output.replace(/{%PRICE%}/g, product.price);
  output = output.replace(/{%FROM%}/g, product.from);
  output = output.replace(/{%NUTRIENTS%}/g, product.nutrients);
  output = output.replace(/{%QUANTITY%}/g, product.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, product.description);
  output = output.replace(/{%ID%}/g, product.id);

  if(!product.organic) {
    output = output.replace(/{%NOT_ORGANIC%}/g, 'not-organic');
  }

  return output;
}

const server = http.createServer((req, res) => {
  const {query, pathname} = url.parse(req.url, true)

  //Overview Page
  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const cardHtml = dataObject.map(element => replaceTemplate(templateCard, element)).join('');
    const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardHtml);

    res.end(output);

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' });

    const product = dataObject[query.id];
    const output = replaceTemplate(templateProduct, product);

    res.end(output)

    // API
  } else if (pathname === '/api') {
    res.writeHead(200, { 'Content-type': 'application/json' });
    res.end(data);

    // Not Found
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
    });
    res.end('<h1>Page not found</h1>');
  }
});

server.listen('1000', () => {
  console.log('Listening to requests on port 1000...');
});
