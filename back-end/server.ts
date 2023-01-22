const express = require("express");
const bodyParser = require("body-parser");

import * as BodyParser from "body-parser";
import cors from "cors";
const app = express();
//routers list
const studentRouter = require("./src/routes/studentRouter");


app.use(cors());
app.use(BodyParser.json());



//end point starting for the farmer routes
app.use("/api/student", studentRouter);



module.exports = app