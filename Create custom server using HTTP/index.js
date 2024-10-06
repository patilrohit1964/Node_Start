const http = require("http");
const fs = require("fs");
http
  .createServer((req, res) => {
    if (req.url === "/home") {
      res.write("<h1>hello your welcome to home page</h1>");
      res.end();
    } else if (req.url === "/about") {
      res.write("<h1>About Page</h1>");
      res.end();
    } else if (req.url === "/getproductdata") {
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (!err) {
          let userProductData = JSON.parse(data).products;
          res.write("<h1>This is Product Data</h1>");
          res.write(JSON.stringify(userProductData));
          res.end();
        }
      });
    } else if (req.url === "/user") {
      fs.readFile("./db.json", "utf-8", (err, data) => {
        if (!err) {
          let userProductData = JSON.parse(data).user;
          res.write("<h1>This is User Data</h1>");
          res.write(JSON.stringify(userProductData));
          res.end();
        }
      });
    } else {
      res.write("<h1>Page Not Found Something Went Wrong</h1>");
      res.end();
    }
  })
  .listen(5000);
