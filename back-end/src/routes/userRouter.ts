const userController = require("../controllers/userController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.regStudent);

module.exports = userRouter;
