/** @format */

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

//jwt setup
app.get("/", (req, res) => {
  let token = jwt.sign({ email: "shabbir13@gmail.com" }, "secret");
  res.cookie("token", token);
  res.send("done");
});

// //read the cookie
// app.get("/read", (req, res) => {
//   console.log(req.cookies.token);
// });

//get the token 
app.get("/read", (req, res) => {
  let data=jwt.verify(req.cookies.token,"secret");
  console.log(data);
  
});

app.listen(3000);
