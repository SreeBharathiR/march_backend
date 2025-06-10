const User = require("../Models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json({
      message: "User fetched",
      // users: users,
      users,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const getUserById = async (req, res) => {
  try {
    // Get the id from routes
    const { userId } = req.params;

    // Get user from DB
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: "User fetched", // Optional
      user,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const createUser = async (req, res) => {
  try {
    // Get data from request body
    const userData = req.body;

    const existingUser = await User.findOne({ username: userData.username });

    if (existingUser) {
      return res.status(400).json({
        message: "User with same username already exists",
      });
    }

    // Create user
    const newUser = await User.create(userData);

    res.status(201).json({
      message: "User created",
      newUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    // Get id and data
    const { userId } = req.params;
    const userData = req.body;

    const updatedUser = await User.findByIdAndUpdate(userId, userData, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated",
      user: updatedUser,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteUser = async (req, res) => {
  try {
    // Get id from params
    const { userId } = req.params;

    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
