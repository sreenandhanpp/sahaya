//importing modules
const mongoose = require("mongoose");

//defining the structure of the collection
const Schema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//creating the model
const User = mongoose.model("user", Schema);

module.exports = User;
