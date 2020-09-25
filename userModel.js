const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageName: String,
  // height: Number,
  // width: Number,
  // extension: String,
  userName: String,
  image: {
    type: String,
  },
  lat: String,
  long: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
