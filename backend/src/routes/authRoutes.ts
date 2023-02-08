import { Router } from "express";
import passport from "passport";

const authRouter = Router();

authRouter.get("/login/success", (req: any, res) => {
  if (req.user) {
    const user = {
      user: { Email: req.user.emails[0].value, Role: "guest" },
      accessToken: req.user.accessToken,
    };
    res.status(200).json({
      user: user,
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
  });
  res.redirect("http://localhost:3000/");
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
