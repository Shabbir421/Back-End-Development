/** @format */

const mongoose = require('mongoos');


//schema means what can insert(description) into the database
const todoschema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    maxLength: 50,
  },
  description: {
    type: String,
    required: true,
    maxLength: 200,
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
  updateAt: {
    type: Date,
    required: true,
    default: Date.now(),
  },
});
module.exports = mongoos.model("todo", todoschema);
