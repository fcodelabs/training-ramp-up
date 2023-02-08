import {
  authLoginFailedController,
  authLoginSuccessController,
  authLogoutController,
} from "./../controllers/authController";
import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login/success", authLoginSuccessController);

authRouter.get("/logout", authLogoutController);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);
authRouter.get(
  "/github",
  passport.authenticate("github", {
    scope: ["profile", "email"],
  })
);
authRouter.get(
  "/github/callback",
  passport.authenticate("github", {
    successRedirect: "http://localhost:3000/",
    failureRedirect: "/login/failed",
  })
);

authRouter.get("/login/failed", authLoginFailedController);

export default authRouter;
