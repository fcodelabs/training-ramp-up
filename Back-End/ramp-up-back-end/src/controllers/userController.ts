import { NextFunction, Request, Response } from "express";
import { createUserService } from "../services/userService";

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
