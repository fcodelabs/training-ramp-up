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
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie("refreshToken", newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      });
    }

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
    });
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
        maxAge: 60 * 60,
        httpOnly: true,
      });
      res.cookie("refreshToken", newToken.newRefreshToken, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
      });
    }

    res.status(200).json({
      status: "success",
      data: user,
    });
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

    res.status(200).json({
      status: "success",
    });
  } catch (err) {
    next(err);
  }
};
