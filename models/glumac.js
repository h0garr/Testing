const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const glumac = new Schema({
  name: String,
  rating: Number,
  age: Number,
  image_path: Number,
  objectID: String,
  movies: [String],
  awards: String,
});
const Glumac = mongoose.model("glumac", glumac);
module.exports = Glumac;
