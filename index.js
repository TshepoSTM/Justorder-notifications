const express = require("express");
const app = express();
const { JWT } = require("google-auth-library");
const { dotenv } = require("dotenv");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const ftp = require("basic-ftp");

const routes = require("./src/routes/routes");
const { PORT } = process.env;

app.use(express.json()); // Middleware to parse JSON requests

//Root file of the project
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server." + `${PORT}`);
});

app.use(express.json());
app.use("/api", routes);

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
