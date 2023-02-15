const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const express = require("express");
const userRouter = express.Router();

userRouter.post("/signup", userController.regStudent);
userRouter.post("/login", authController.login);
userRouter.get("/refresh", authController.handleRefreshToken);
userRouter.get("/logout", authController.logout);
module.exports = userRouter;
