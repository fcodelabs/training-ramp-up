const express = require("express");
const bodyParser = require("body-parser");
const app = express();




//routers list
const studentRouter = require("./src/routes/studentRouter");



app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


//end point starting for the farmer routes
app.use("/api/student", studentRouter);



module.exports = app