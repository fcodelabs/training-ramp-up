"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const user_auth_guard_1 = require("../middleware/user.auth.guard");
exports.userRouter = express_1.default.Router();
//Sign Up User
exports.userRouter.post("/register", controllers_1.registerUser);
//Sign In User
exports.userRouter.post("/login", controllers_1.loginUser);
//Check user status
exports.userRouter.get("/status", user_auth_guard_1.UserAuthGuard, controllers_1.loginStatus);
//Log out user
exports.userRouter.delete("/logout", controllers_1.logoutUser);
