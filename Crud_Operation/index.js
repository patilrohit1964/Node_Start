const express = require("express");
const fs = require("fs");
const app = express();
app.use(express.json());

// get data from db.json
app.get("/getdata", (req, res) => {
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      console.log(data);
      res.send(data);
    }
  });
});

// post data in db.json
app.post("/insert", (req, res) => {
  const dataGetFromServer = req.body;

  fs.readFile("./db.json", "utf-8", async (err, data) => {
    if (!err) {
      const convertDataInJsObject = JSON.parse(data);
      convertDataInJsObject.product.push(dataGetFromServer);
      fs.writeFile(
        "./db.json",
        JSON.stringify(convertDataInJsObject),
        (err) => {
          if (err) return err;
        }
      );
      res.send("ok Insert Data Successfully");
    }
  });
});
app.put("/update/:id", (req, res) => {
  const getIdFromParam = req.params.id;
  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      const convertDataInJsObject = JSON.parse(data);
      convertDataInJsObject.product.forEach((product, index) => {
        if (product.id === parseInt(getIdFromParam)) {
          convertDataInJsObject.product[index] = req.body;
          fs.writeFile(
            "./db.json",
            JSON.stringify(convertDataInJsObject),
            (err) => {
              if (err) return err;
            }
          );
          res.send("updated successfully");
        }
      });
    }
  });
});

// delete data from db.json
app.delete("/delete/:id", (req, res) => {
  const getIdFromParam = req.params.id;

  fs.readFile("./db.json", "utf-8", (err, data) => {
    if (!err) {
      const convertDataInJsObject = JSON.parse(data);
      convertDataInJsObject.product.forEach((product, index) => {
        if (product.id === parseInt(getIdFromParam)) {
          convertDataInJsObject.product.splice(index, 1);
          res.send("Delete Successfully");
          fs.writeFile(
            "./db.json",
            JSON.stringify(convertDataInJsObject),
            (err) => {
              if (err) return err;
            }
          );
        }
      });
    }
  });
});

app.listen(7000, () => {
  console.log("server running on 7000");
});
