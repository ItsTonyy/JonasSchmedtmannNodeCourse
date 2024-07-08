import http from 'node:http'

const server = http.createServer((req, res) => {
  res.write('Hello World, again...')
  res.end()
})

server.listen('1000', () => {
  console.log('Listening to requests on port 1000...')
})

