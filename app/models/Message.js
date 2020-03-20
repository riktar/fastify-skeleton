const { Schema } = require("mongoose");
module.exports = new Schema({
  message: String,
  from: {type: String, required: true, minLength: 1},
  to: {type: String, required: true, minLength: 1}
});
