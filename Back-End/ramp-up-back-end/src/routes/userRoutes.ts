import express from "express";
import { registerUser, loginUser } from "../controllers/userController";
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

export default router;
