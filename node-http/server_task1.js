var http = require('http');
var path = require('path');
var fs = require('fs');

var host = 'localhost';
var port = 5000;

var server = http.createServer((req, res) => {
  res.writeHead(200);
    res.end(`The NodeJS server on port ${port} is now running....`);
})


server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
})