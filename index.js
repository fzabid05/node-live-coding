const express = require("express");
const mongoose = require("mongoose");

const WilderModel = require("./models/Wilder");

mongoose
  .connect("mongodb://127.0.0.1:27017/wilderdb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  })
  .then(() => console.log("Connected to database."))
  .catch((err) => console.error(err));

const server = express();

server.get('/',(req, res) => {
    res.send("Hello over HTTP");
});

server.post("/wilders", (req, res) => {
    // créer un wilder de base
    WilderModel.init().then(() => {
      const firstWilder = new WilderModel({
					name: "Second Wilder",
					city: "San Francisco",
					skills: [
					{ title: "HTML", voteCount: 10 },
					{ title: "React", voteCount: 5 },
					],
			});

			firstWilder
					.save()
					.then((result) => {
							res.status(201).send("Successfully created wilder.");
					})
					.catch((err) => {
							res.status(500).send("Erroe creating wilder.");
			});
    });
    
});

server.listen(3000, () => {
    console.log('Server listing on port 3000.');
});