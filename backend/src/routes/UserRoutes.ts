import { verifyJWT } from "./../middleware/verifyJWT";
import {
  loginController,
  logoutController,
  refreshTokenController,
} from "./../controllers/userController";
import { Router } from "express";
import { signUpController } from "../controllers/userController";

const router = Router();

router.post("/signup",  signUpController);
router.post("/login", loginController);
router.get("/refresh", refreshTokenController);
router.get("/logout", logoutController);

export default router;
