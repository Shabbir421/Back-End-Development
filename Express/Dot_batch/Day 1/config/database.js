/** @format */

const mongoos = require("mongoos");

require("dotenv").config();

//is use another file then use  the .env file to use
const dbcoonect = () => {
  mongoos
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    //it will return promis
    .then(() => {
      console.log("Connected to MongoDB");
    })
    .catch((err) => {
      console.log("issues ");
      console.error("Connection error");
      process.exit(1); //
    });
};

module.exports = dbcoonect;
