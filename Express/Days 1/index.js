/** @format */

const express = require("express"); //require the http module
const app = express(); //express ki shari power app me

//middlware
//=> koi bhi route chale usse pahle middlware use karte hai
//=> jab bhi server req. accept  karta h waha se route ke beech pahunchne tak agar aap us req. ko beech me rokte ho and kuch perform karte ho to ye element middlware kahlata h
//middlware har bar chalta h

app.use(function (req, res, next) {
  //it not forward req  next
  console.log("middlware chalao");
  next(); //if we use next() then it forward next route
});

app.get("/", function (req, res) {
  //get means insert value => (req,res) its a middleware
  res.send("hello world!"); //response send
});

app.get("/abc", function (req, res) {
  //get means insert value => (req,res) its a middleware
  res.send("hello bhai!"); //response send
});
app.listen(3000); //any number that port is listening

// it is not realtime changes to value and run it will restart

//=> if we installed nodemon than it will realtime any changes than it run code
//=> it will run npx nodemon file_name

//error  handling
app.get("/profile", function (req, res, next) {
  return next(new Error("Not implemented"));
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("hello bhai!"); //response send
});
