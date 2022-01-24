const express = require("express");
const app = express();
require("dotenv").config();
const connectDB = require("./db/mongoose");

const PORT = process.env.PORT;

app.use(express.json());

const start = async () => {
  app.listen(PORT, () => {
    console.log(`Listeneing at port ${PORT}`);
  });
  await connectDB();
};

start();
