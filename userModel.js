const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  imageName: String,
  userName: String,
  image: {
    type: String,
  },
  lat: String,
  long: String,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
