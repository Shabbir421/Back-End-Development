/** @format */

const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//set cookies 
app.get("/", (req, res) => {
  res.cookie("name", "motka");
  res.send("done");
});
//read cookies
app.get("/read", (req, res) => {
  console.log(req.cookies);
  res.send("read");
});

app.listen(3000);
