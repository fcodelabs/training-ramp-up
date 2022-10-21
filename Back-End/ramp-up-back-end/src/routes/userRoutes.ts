import express from "express";
import { registerUser } from "../controllers/userController";
import { registerUserRules, userValidation } from "../validation/userValidatio";

const router = express.Router();

router.route("/").post(registerUserRules(), userValidation, registerUser);

export default router;
