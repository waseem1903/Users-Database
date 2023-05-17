const express = require("express");
const {
  registerUser,
  loginUser,
  getProfile,
} = require("../controllers/user.controller");
const {
  authMiddleware,
  isDeletedMiddleware,
} = require("../middlewares/auth.middleware");
const routes = express.Router();

routes.post("/register", registerUser);
routes.post("/login", loginUser);
routes.get("/profile", authMiddleware, isDeletedMiddleware, getProfile);

module.exports = routes;
