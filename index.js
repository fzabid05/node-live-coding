const express = require("express");
const mongoose = require("mongoose");

const wilderController = require("./controllers/wilder");

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database."))
  .catch((err) => console.error(err));

const server = express().use(express.json());

server.get('/',(req, res) => {
    res.send("Hello over HTTP");
});

server.post("api/wilders", wilderController.create);

server.listen(3000, () => {
    console.log('Server listing on port 3000.');
});