/** @format */

const express = require("express");
const app = express();

const userModel = require("./usermodel");

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

//create
app.get("/create", async (req, res) => {
  // asynchronous - using async allows the code to wait for the database operation
  let createduser = await userModel.create({
    name: "shabbir",
    username: "shabbir11",
    email: "shabbir@gmail.com",
  });
  res.send(createduser); // returns the created user once the asynchronous operation is complete
});

//update
app.get("/update", async (req, res) => {
  let updateduser = await userModel.findOneAndUpdate(
    {
      username: "shabbir11",
    },
    { name: "vishal" },
    { new: true }
  );
  res.send(updateduser); // returns the updated user once the asynchronous operation is complete
});

//read
app.get("/read", async (req, res) => {
  let user = await userModel.find({
    username: "shabbir11",
  });
  res.send(user); // returns the updated user once the asynchronous operation is complete
});

//delete
app.get("/delete", async (req, res) => {
  let user = await userModel.findOneAndDelete({
    username: "shabbir11",
  });
  res.send(user); // returns the updated user once the asynchronous operation is complete
});

//listen port
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
