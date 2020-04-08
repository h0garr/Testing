const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const serija = new Schema({
  name: String,
  plot: String,
  episodes: String,
});
const Serija = mongoose.model("serija", serija);
module.exports = Serija;
