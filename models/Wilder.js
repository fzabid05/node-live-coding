const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const WilderSchema = new Schema({
    name: { type: String, unique: true },
  city: String,
  skills: [{ title: String, voteCount: Number }],
});
module.exports = mongoose.model("wilder", WilderSchema);