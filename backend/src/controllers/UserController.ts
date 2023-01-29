import {
  findUserByRefreshTokenService,
  loginUserService,
  registerUserService,
  updateRefreshTokenService,
} from "../services/userServices";
import { Request, Response } from "express";
import cookie from "cookie";
import jwt from "jsonwebtoken";

export const signUpController = async (req: Request, res: Response) => {
  try {
    const user = req.body.data;
    console.log(user);
    const userInsert = await registerUserService(user);

    res.status(201).json(userInsert);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const loginController = async (req: Request, res: Response) => {
  const user = req.body.data;
  try {
    const userLogin = await loginUserService(user);
    if (userLogin !== null) {
      //   const token = userLogin.generateAuthToken();
      //   res.setHeader(
      //     "Set-Cookie",
      //     cookie.serialize("token", token, {
      //       httpOnly: true,
      //       secure: process.env.NODE_ENV !== "development",
      //       sameSite: "strict",
      //       maxAge: 3600,
      //       path: "/",
      //     })
      //   );

      const accessToken = jwt.sign(
        { userInfo: { userRole: userLogin.Role, userEmail: userLogin.Email } },
        process.env.ACCESS_TOKEN_SECRET as string,
        { expiresIn: "30s" }
      );
      const refreshToken = jwt.sign(
        { user: userLogin.Email },
        process.env.REFRESH_TOKEN_SECRET as string,
        { expiresIn: "1d" }
      );
      await updateRefreshTokenService(userLogin, refreshToken);
      res.cookie("jwt", refreshToken, {
        httpOnly: true,
        maxAge: 3600 * 24 * 1000,
        path: "/",
        sameSite: "strict",
        secure: process.env.NODE_ENV !== "development",
      });
      res.send(accessToken);
    }
  } catch (err) {
    res.status(400).send(err);
  }
};

export const refreshTokenController = async (req: Request, res: Response) => {
  const cookie = req.cookies;

  if (cookie.jwt === null) return res.sendStatus(401);
  const refreshToken = cookie.jwt;
  try {
    const foundUser = await findUserByRefreshTokenService(refreshToken);
    if (foundUser === null) return res.sendStatus(403);
    const accessToken = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET as string,
      (err: any, decoded: any) => {
        if (err || decoded.user !== foundUser.Email) return res.sendStatus(403);

        const accessToken = jwt.sign(
          {
            userInfo: { userRole: foundUser.Role, userEmail: foundUser.Email },
          },
          process.env.ACCESS_TOKEN_SECRET as string,
          { expiresIn: "30s" }
        );
        res.send(accessToken);
      }
    );
  } catch (err) {
    res.status(403).send(err);
  }
};

export const logoutController = async (req: Request, res: Response) => {
  const cookie = req.cookies;
  if (cookie.jwt === null) return res.sendStatus(204); //No content
  res.clearCookie("jwt", { httpOnly: true });

  res.status(204).send("logout");
};
