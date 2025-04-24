const express = require("express");
const app = express();
const { JWT } = require("google-auth-library");
const { dotenv } = require("dotenv");
require("dotenv").config();
const fs = require("fs");
const path = require("path");
const ftp = require("basic-ftp");

const { PORT } = process.env;

const port = 5001;

app.use(express.json()); // Middleware to parse JSON requests

//Root file of the project
app.get("/", (req, res) => {
  res.status(200);
  res.send("Welcome to root URL of Server.", PORT);
});

app.listen(PORT, (error) => {
  if (!error) {
    console.log(`Server is running on http://localhost:${PORT}`);
  } else {
    console.log("Error occurred, server can't start", error);
  }
});
