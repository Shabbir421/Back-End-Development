/** @format */

//import the model

const Todo = require("../models/Todo");

//define route handlers

exports.createTodo = async (req, res) => {
  try {
    //extract title and description from req body
    const { title, description } = req.body;
    //create a new todo using the model

    const res = await Todo.creat({ title, description });

    //send json response with success flag
    res.status(200).json({
      success: res,
      message: "Todo created successfully",
      data: res,
    });
  } catch (err) {
    console.error(err);
    console.log(err);
    res.status(500).json({
      success: false,
      data: "internal server error 500",
      message: "Failed to create todo",
    });
  }
};
