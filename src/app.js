const express = require("express");
const {
  getUsersWithPostCount,
  getUsersPagination,
} = require("./controllers/user.controller");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/users", getUsersWithPostCount);
app.get("/users?", getUsersPagination);

module.exports = app;
