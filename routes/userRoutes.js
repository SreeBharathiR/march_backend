const express = require("express");
const {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const userRoutes = express.Router();

userRoutes.get("/", getAllUsers);

userRoutes.get("/:userId", getUserById);

userRoutes.post("/", createUser);

userRoutes.put("/:userId", updateUser);

userRoutes.delete("/:userId", deleteUser);

module.exports = userRoutes;
