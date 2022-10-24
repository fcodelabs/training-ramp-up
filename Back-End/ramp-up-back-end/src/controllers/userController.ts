import { NextFunction, Request, Response } from "express";
import { createUserService, loginUserService } from "../services/userService";
import jwt from "jsonwebtoken";
import { config } from "../../utils/config";

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

    res.status(201).json({
      status: "success",
      data: {
        user,
      },
      accessToken: jwt.sign({ Email: email }, config.jwt_secret_key, {
        expiresIn: "5m",
      }),
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

    res.status(200).json({
      status: "success",
      data: user,
      accessToken: jwt.sign({ Email: email }, config.jwt_secret_key, {
        expiresIn: "5m",
      }),
    });
  } catch (err) {
    next(err);
  }
};
