const User = require("../Models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = async (req, res, next) => {
  try {
    // Get data from request body
    const { username, email, password, mobile, age } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      const error = new Error("User already exists with same username");
      error.statusCode = 400;
      throw error;
    }

    // Create user
    const newUser = await User.create({
      username,
      email,
      password,
      mobile,
      age,
    });

    res.status(201).json({
      message: "User created",
      newUser,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    // Get data from req.body
    const { username, password } = req.body;

    // Check user exists
    const user = await User.findOne({ username });

    if (!user) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const isValidPass = await bcrypt.compare(password, user.password);

    if (!isValidPass) {
      const error = new Error("Invalid credentials");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign(
      {
        userId: user._id,
        username: user.username,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRY,
      }
    );

    // Cookies
    res.cookie("jwt", token, {
      maxAge: parseInt(process.env.COOKIE_EXPIRY),
      httpOnly: true,
    });

    res.status(200).json({
      message: "Login success",
      token,
    });
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("jwt");
    res.status(200).json({
      message: "Logout success",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login, logout };
