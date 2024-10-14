/** @format */

const express = require("express");
const app = express();
const userModel = require("./models/user");
const postModel = require("./models/post");
const cookieParser = require("cookie-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//* form handling
app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.get("/", (req, res) => {
  res.render("index");
});

//* for registration
app.post("/register", async (req, res) => {
  let { email, name, password, age, username } = req.body;

  let user = await userModel.findOne({ email });
  if (user) return res.status(500).send("user already register ");

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(password, salt, async (err, hash) => {
      let user = await userModel.create({
        username,
        name,
        password: hash,
        age,
        email,
      });

      let token = jwt.sign({ email: email, userid: user._id }, "secrete");
      res.cookie("token", token);
      res.send("regitered");
    });
  });
});

//? login page
app.get("/login", (req, res) => {
  res.render("login");
});

//? profile page
app.get("/profile", isLoggedIn, async (req, res) => {
  let user = await userModel
    .findOne({ email: req.user.email })
    .populate("post");
  res.render("profile", { user });
});
//? like page
app.get("/like/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  if (post.likes.indexOf(req.user.userid) === -1) {
    post.likes.push(req.user.userid);
  } else {
    post.likes.splice(post.likes.indexOf(req.user.userid), 1);
  }
  await post.save();
  res.redirect("/profile");
});
//? edit page
app.get("/edit/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOne({ _id: req.params.id }).populate("user");
  res.render("edit", { post });
});
//? update post page
app.post("/update/:id", isLoggedIn, async (req, res) => {
  let post = await postModel.findOneAndUpdate(
    { _id: req.params.id },
    { content: req.body.content }
  );
  res.redirect("/profile");
});
//? profile page for post
app.post("/post", isLoggedIn, async (req, res) => {
  let user = await userModel.findOne({ email: req.user.email });
  let { content } = req.body;
  let post = await postModel.create({
    user: user._id,
    content,
  });
  user.post.push(post._id);
  await user.save();
  res.redirect("/profile");
});

//* for login
app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await userModel.findOne({ email });
  if (!user) return res.status(500).send("somthing went wrong ");
  bcrypt.compare(password, user.password, (err, result) => {
    if (result) {
      let token = jwt.sign({ email: email, userid: user._id }, "secrete");
      res.cookie("token", token);
      res.status(200).send("you can login");
    } else res.redirect("/login");
  });
});

//? logout page
app.get("/logout", (req, res) => {
  res.cookie("token", "");
  res.redirect("/login");
});

//? middleware for protected token

function isLoggedIn(req, res, next) {
  if (req.cookies.token === "") res.send("you must be logged in");
  else {
    let data = jwt.verify(req.cookies.token, "secrete");
    req.user = data;
    next();
  }
}

app.listen(3000);
