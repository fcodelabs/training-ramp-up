import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import {
  deleteRefeshTokenService,
  findUserByRefreshTokenService,
  loginUserService,
  registerUserService,
  updateRefreshTokenService,
} from "../services/userServices";
import { BackendError } from "../utils/backendErr";

export const signUpController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.body.data;
    const userInsert = await registerUserService(user);
    res.status(201).json("User created successfully");
  } catch (err) {
    next(new BackendError("User already exists", 400));
  }
};

export const loginController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.body.data;
  try {
    const userLogin = await loginUserService(user);
    if (userLogin) {
      const accessToken = jwt.sign(
        { userInfo: { userRole: userLogin.Role, userEmail: userLogin.Email } },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "3s" }
      );
      const refreshToken = jwt.sign(
        { user: userLogin.Email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "3d" }
      );
      await updateRefreshTokenService(userLogin, refreshToken);

      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 24 * 1000,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      const { Email, Role } = userLogin;
      const user = { user: { Email, Role }, accessToken: accessToken };
      res.send(user);
    }
  } catch (err) {
    next(err);
  }
};

export const refreshTokenController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookie = req.cookies;
  if (!cookie.jwt) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  try {
    const foundUser = await findUserByRefreshTokenService(refreshToken);

    if (!foundUser) {
      const newErr = new BackendError("User not found", 404);
      next(newErr);
    }
    const accessToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err || decoded.user !== foundUser.Email) {
          const newErr = new BackendError("Invalid token", 403);
          next(newErr);
        }
        const accessToken = jwt.sign(
          {
            userInfo: { userRole: foundUser.Role, userEmail: foundUser.Email },
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "3s" }
        );
        res.send(accessToken);
      }
    );
  } catch (err) {
    next(err);
  }
};

export const logoutController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log("logout");
    const cookie = req.cookies;
    if (!cookie.jwt) return res.sendStatus(204); //No content
    const updateUser = deleteRefeshTokenService(req.body.data);
    res.clearCookie("jwt", { httpOnly: true });
    res.clearCookie("session");
    res.clearCookie("session.sig");
    res.status(204).send("logout");
  } catch (err) {
    //  console.log(err);
    next(err);
  }
};
