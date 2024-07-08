const eventEmitter = require('events');

const myEmitter = new eventEmitter();

myEmitter.on('newSale', () => {
  console.log('There was a new sale!')
})

myEmitter.on('newSale', () => {
  console.log('Costumer name: Tony')
})

myEmitter.on('newSale', (stock) => {
  console.log(`There are now ${stock} items left in stock.`)
})

myEmitter.emit('newSale', 9)