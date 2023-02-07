import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login/success", (req, res) => {
  if (req.user) {
    res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
      //   cookies: req.cookies
    });
  }
});

authRouter.get("/logout", function (req, res, next) {
  console.log("logout");
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
    res.redirect("/");
  });
});
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
authRouter.get("/login/failed", (req, res) => {
  res.status(400).send("failed to login");
});
export default authRouter;