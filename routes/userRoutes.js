const express = require("express");
const getAllUsers = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

module.exports = userRoutes;
