const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  phno: Number,
  isCostomer: Boolean,
  gae: Number,
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
