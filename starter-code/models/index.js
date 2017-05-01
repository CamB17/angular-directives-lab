var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/cards");

module.exports = require("./card.js");