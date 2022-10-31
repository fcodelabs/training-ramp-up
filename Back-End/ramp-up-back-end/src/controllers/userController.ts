import { NextFunction, Request, Response } from "express";
import {
  createUserService,
  loginUserService,
  createToken,
} from "../services/userService";

export const registerUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, password, email } = req.body;

    const user = await createUserService({
      name,
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      const newToken = createToken(user);
      res.cookie("accessToken", newToken.newAccessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      res.cookie("logedUser", newToken.dataStoredInToken, {
        maxAge: 60 * 60 * 1000,
      });

      console.log("acctoken", newToken.newAccessToken);
      console.log("refrhtoken", newToken.newRefreshToken);

      return res.status(200).send(user);
    }
  } catch (err: any) {
    if (err.code === "23505") {
      return res.status(409).json({
        status: "fail",
        message: "User with that email already exist",
      });
    }
    next(err);
  }
};

export const loginUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { password, email } = req.body;

    const user = await loginUserService({
      email: email.toLowerCase(),
      password,
    });

    if (user) {
      const newToken = createToken(user);
      res.cookie("accessToken", newToken.newAccessToken, {
        maxAge: 60 * 60 * 1000,
        httpOnly: true,
      });
      res.cookie("refreshToken", newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24 * 1000,
        httpOnly: true,
      });
      res.cookie("logedUser", newToken.dataStoredInToken, {
        maxAge: 60 * 60 * 1000,
      });

      console.log("acctoken", newToken.newAccessToken);
      console.log("refrhtoken", newToken.newRefreshToken);

      res.status(200).send(user);
    }
  } catch (err) {
    next(err);
  }
};

export const logoutUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie("accessToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie("refreshToken", "", {
      maxAge: -1,
      httpOnly: true,
    });
    res.cookie("logedUser", "", {
      maxAge: -1,
    });
    res.status(200).json({
      status: "Successfully logged out",
    });
  } catch (err) {
    next(err);
  }
};
