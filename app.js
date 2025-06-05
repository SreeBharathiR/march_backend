const express = require("express");
const dotenv = require("dotenv");
dotenv.config();

const server = express();

server.listen(process.env.PORT, () => {
  console.log("Server is running...");
});

server.get("/", (req, res) => {
  res.status(200).json({ message: "New Server in this port with get method" });
});
