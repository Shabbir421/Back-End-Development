const express=require('express');
const app=express();

//load config from env file 
require("dotenv").config();
const PORT =process.env.PORT ||4000;

//need of middleware to parsejson request body
app.use(express.json());

//import routes for todo api
const todoroutes=require('./routes/todos');

//mount todo api routes
app.use('/api/v1',todoroutes);

//start server 
app.listen(PORT,() => {
  console.log(`Server is running on port ${PORT}`);
})

//connect to database
const dbcoonection = require('./config/database');
dbcoonection();

//default routes
app.get('/', (req,res) => {
  res.send(`<h1>web app</h1>`)
})