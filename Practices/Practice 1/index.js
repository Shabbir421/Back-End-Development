/** @format */

// Importing required modules
const express = require("express");
const path = require("path");

// Create an instance of the express application
const app = express();

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Middleware to parse incoming requests with URL-encoded payloads
app.use(express.urlencoded({ extended: true }));

// Setting up the static file directory to serve CSS, JavaScript, and images
app.use(express.static(path.join(__dirname, "public")));

// Set up EJS as the templating engine
app.set("view engine", "ejs");

// Define the root route that renders the index.ejs page
app.get("/", function (req, res) {
  res.render("index"); // Render the index view from the views directory
});

// Dynamic route for profile that accepts a name and age from the URL
app.get("/profile/:name/:age", function (req, res) {
  const { name, age } = req.params; // Destructure name and age from request parameters
  res.send(`Welcome ${name}, age of ${age}`); // Send a response with the provided name and age
});

// Start the server on port 3000
app.listen(3000, function () {
  console.log("Server started on port 3000");
});
