import http from 'node:http'
import url from 'node:url'

const server = http.createServer((req, res) => {
  const pathName = req.url

  if(pathName === '/' || pathName === '/overview') {
    res.end('This is the Overview route')
  } else if (pathName === '/product') {
    res.end('This is the product route')
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html'
    })
    res.end('<h1>Page not found</h1>')
  }
})

server.listen('1000', () => {
  console.log('Listening to requests on port 1000...')
})
