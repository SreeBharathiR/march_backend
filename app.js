const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRoutes = require("./routes/userRoutes");
dotenv.config();

const server = express();
server.use(express.json());

// const connection = async () => {
//   try {
//     await mongoose.connect("mongodb://localhost:27017");
//     console.log("DB Connected");
//   } catch (error) {
//     console.log("error while connect db");
//   }
// };

// connection();

mongoose
  .connect("mongodb://localhost:27017/ecomDB")
  .then(console.log("DB Connected"))
  .catch((error) => console.log("Error on DB Connection ", error.message));

server.get("/", (req, res) => {
  res.status(200).json({ message: "New Server in this port with get method" });
});

server.use("/users", userRoutes);

server.listen(process.env.PORT, () => {
  console.log("Server is running...");
});
