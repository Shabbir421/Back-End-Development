/** @format */

const express = require("express");
const app = express();
const path = require("path"); //path require
const userModel = require("./models/user");

app.set("view engine", "ejs"); //for ejs setup
//form handlers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", function (req, res) {
  res.render("index");
});

//read page
app.get("/read", async function (req, res) {
  let allusers = await userModel.find();
  res.render("read", { users: allusers });
});

//delete
app.get("/delete/:id", async function (req, res) {
  let users = await userModel.findOneAndDelete({ _id: req.params.id });
  res.redirect("/read");
});

//edit
app.get("/edit/:userid", async function (req, res) {
  let user = await userModel.findOne({ _id: req.params.userid });
  res.render("edit", { user });
});

//update
app.post("/update/:userid", async function (req, res) {
  let { name, email, image } = req.body;
  let user = await userModel.findOneAndUpdate(
    { _id: req.params.userid },
    { name, email, image },
    { new: true }
  );
  res.redirect("/read");
});

//create
app.post("/craete", async function (req, res) {
  let { name, email, image } = req.body;
  let createuser = await userModel.create({
    name,
    email,
    image,
  });
  res.redirect("/read");
});

app.listen(3000);
