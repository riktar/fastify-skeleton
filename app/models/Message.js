const { Schema } = require("mongoose");
module.exports = new Schema({
  message: String,
  from: String,
  to: String
});
