const express = require("express");
const { register, login, logout } = require("../controllers/authController");
const { verify } = require("jsonwebtoken");
const { protect } = require("../middlewares/authMiddlewares");

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", protect, logout);

authRoutes.get("/verify", protect, verify);

module.exports = authRoutes;
