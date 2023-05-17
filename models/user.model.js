const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    default: "",
    require: true,
  },
  email: {
    type: String,
    lowercase: true,
    require: true,
  },
  password: {
    type: String,
  },
  isDeleted: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: new Date(),
  },
  updatedAt: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
