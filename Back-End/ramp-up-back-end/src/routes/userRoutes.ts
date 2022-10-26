import express from "express";
import { authorization } from "../middlewares/auth";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/userController";
import {
  loginUserRules,
  registerUserRules,
  userValidation,
} from "../validation/userValidatio";

const router = express.Router();

router
  .route("/register")
  .post(registerUserRules(), userValidation, registerUser);
router.route("/login").post(loginUserRules(), userValidation, loginUser);
router.route("/logout").get(authorization, logoutUser);

export default router;
