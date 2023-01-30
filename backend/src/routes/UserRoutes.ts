import {
  refreshTokenController,
  logoutController,
  loginController,
  signUpController,
} from "./../controllers/UserController";
import { verifyJWT } from "./../middleware/verifyJWT";
import { Router } from "express";

const router = Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.get("/refresh", refreshTokenController);
router.get("/logout", logoutController);

export default router;
