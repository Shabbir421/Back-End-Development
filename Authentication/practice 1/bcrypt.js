/** @format */

const express = require("express");
const app = express();
const bcrypt = require("bcrypt");

// //encrypt password
// app.get("/", (req, res) => {
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash("hello buddy", salt, (err, hash) => {
//       console.log(hash);
//     });
//   });
// });

//comaring encryp password
app.get("/", (req, res) => {
  bcrypt.compare(
    "hello buddy",
    "$2b$10$xk3vBPlBhLlkiIiXM1kACeAf.ImBu04yBiCwvZyew.fTsrhX5xwya",
    (err, result) => {
      console.log(result);
    }
  );
});

app.listen(3000);
