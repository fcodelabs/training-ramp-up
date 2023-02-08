import { NextFunction, Request, Response } from "express";

export const authLogoutController=(req:Request, res:Response, next:NextFunction) => {
  req.logout(function (err) {
    if (err) {
      console.log(err);
      return next(err);
    }
  });
  res.clearCookie("jwt", { httpOnly: true });
  res.clearCookie("session");
  res.clearCookie("session.sig");
  res.status(204).send("logout");
  //res.redirect("http://localhost:3000/");
}
export const authLoginFailedController=(req:Request, res:Response, next:NextFunction) => {
  res.status(401).send("login failed");
}
export const authLoginSuccessController=(req:any, res:Response, next:NextFunction) => {
if (req.user) {
    const user = {
      user: { Email: req.user.emails[0].value, Role: "guest" },
      accessToken: req.user.accessToken,
    };
    res.status(200).json({
      user: user,
    });
  }
}
