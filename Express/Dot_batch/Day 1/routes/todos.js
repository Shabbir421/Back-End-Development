/** @format */

const express = require("express");
const router = express.Router(); // Corrected this line

// Import controller
const { createTodo } = require('../controllers/createTodo');

// Define API routes
router.post("/createTodo", createTodo);

module.exports = router;
