var http = require('http');
var path = require('path');
var fs = require('fs');


var host = 'localhost';
var port = 3000;

var server = http.createServer((req, res) => {
console.log(`The NodeJS server on port ${port} is now running....`);

if (req.method === "GET") {
  var fileUrl = req.url;
  if (fileUrl === "/") {
    fileUrl = "/home.html";
  } else if (fileUrl === "/contact") {
    fileUrl = "/contact.html";
  } else if (fileUrl === "/about") {
    fileUrl = "/about.html";
  }

  var filePath = path.resolve("./public" + fileUrl);
  var fileExt = path.extname(filePath);

  if (fileExt === ".html") {
    fs.access(filePath, function (err) {
      if (err) {
        res.statusCode = 404;
        res.setHeader("Content-Type", "text/html");
        res.end(
          `<html><body><h1>Error 404: ${fileUrl} is not found</h1></body></html>`
        );
        return;
      }
      return (res.statusCode = 200);
      res.setHeader("Content-Type", "text/html");
      fs.readFile(filePath).pipe(res);
    });
  } else {
    return (res.statusCode = 404);
    res.setHeader("Content-Type", "text/html");
    res.end(
      `<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`
    );
  }
} else {
  return (res.statusCode = 404);
  res.setHeader("Content-Type", "text/html");
  res.end(
    `<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`
  );
}
});

server.listen(port, host, () => {
  console.log(`Server running at http://${host}:${port}/`);
});