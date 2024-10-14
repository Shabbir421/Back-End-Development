/** @format */

const express = require("express");
const app = express();
const userModel = require("./models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//require cookie amd path
const cookieParser = require("cookie-parser");
const path = require("path");
const { hash } = require("crypto");

// form handling
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

//create user
app.post("/create", (req, res) => {
  let { username, password, age, email } = req.body;
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let createduser = await userModel.create({
        username,
        password: hash,
        email,
        age,
      });
      let token = jwt.sign({ email }, "shabbir");
      res.cookie("token", token);
      res.send(createduser);
    });
  });
});
//logout
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/");
});

//login
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", async (req, res) => {
  let user = await userModel.findOne({ email: req.body.email });
  if (!user) return res.send("something is wrong ");

  bcrypt.compare(req.body.password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: user.email }, "shabbir");
      res.cookie("token", token);
      res.send("yes you can login");
    } else res.send("something is wrong ");
  });
});

app.listen(3000);
