var http = require('http');
var path = require('path');
var fs = require('fs');

var host = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
  console.log(`The NodeJS server on port ${port} is now running....`);
   res.write('Home Page.')

  if(req.method === 'GET') {
    var fileUrl = req.url;
    if(fileUrl === '/about') {
      fileUrl = 'about.html';
    } 

    var filePath = path.resolve('./' + fileUrl);
    var fileExt = path.extname(filePath);

   
        if(fileExt === '.html') {
          fs.access(filePath, function (err) {
        if (err) {
          return res.statusCode = 404;
          return res.setHeader("Content-Type", "text/html");
          return res.end(
            `<html><body><h1>Error 404: ${fileUrl} is not found</h1></body></html>`
          );
        }
        return res.statusCode = 200;
        return res.setHeader("Content-Type", "text/html");
        fs.createReadStream(filePath).pipe(res);
      });
    } else {
      return res.statusCode = 404;
      return res.setHeader("Content-Type", "text/html");
      return res.end(
        `<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`
      );
    }
  } else {
    return res.statusCode = 404;
    return res.setHeader("Content-Type", "text/html");
    return res.end(
      `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
    );
  }

let handleRequest = (req, res) => {
  res.writeHead(200, {
    "Content-Type": "text/html",
  });
  fs.readFile("./about.html", null, function (error, data) {
    if (error) {
      res.writeHead(404);
      res.write("Whoops! File not found!");
    } else {
      res.write(data);
    }
    res.end();
  });
};






});


server.listen(port, host, () => {
    console.log(`Server running at http://${host}:${port}/`);
});