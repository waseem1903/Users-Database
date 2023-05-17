const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  console.log("Inside registerUser API");
  try {
    const { password, ...rest } = req.body;

    const exist = await User.findOne({ email: rest.email, isDeleted: false });
    if (exist) return res.status(400).send("User Already Exists!");

    const user = new User({
      ...rest,
    });
    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    user.password = hashPassword;
    user.save();

    res.send({ message: "User Registerd Successfully!" });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const loginUser = async (req, res) => {
  console.log("Inside loginUser API");

  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email, isDeleted: false });
    if (!user) return res.status(400).send({ message: "User Not Found!" });
    try {
      const response = await bcrypt.compare(password, user.password);
      if (response) {
        const token = await jwt.sign(
          {
            id: user._id,
            email: user.email,
            name: user.name,
          },
          process.env.JWT_PRIVATE_KEY
        );
        console.log("Token", token);

        res.send({ user, token, message: "User Logged In!" });
      }
    } catch (error) {
      console.log(error);
      return res.status(400).send({ message: "Invalid Username or Password!" });
    }
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const getProfile = async (req, res) => {
  console.log("Inside getUserProfile API");
  const { id, email, name } = req.user;
  try {
    const user = await User.findById({ _id: id });
    res.send({ user, message: "Profile Fetched Successfully!" });
  } catch (error) {
    res.status(500).send(err.message);
  }
};

module.exports = { registerUser, loginUser, getProfile };
