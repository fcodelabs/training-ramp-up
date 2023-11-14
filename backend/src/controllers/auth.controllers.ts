import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as UserServices from "../services/user.services";
import * as AuthService from "../services/auth.service";

import jwt from "jsonwebtoken";
const { v4: uuidv4 } = require("uuid");

const accessSecret: string = process.env.JWT_ACCESS_SECRET || "";
const refreshSecret: string = process.env.JWT_ACCESS_SECRET || "";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await UserServices.findUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return response.status(401).json({ message: "Invalid email or password" });
  }
  const accessToken = jwt.sign(
    { userId: user.id, userRole: user.role },
    accessSecret,
    {
      expiresIn: "10m",
    }
  );
  const id = uuidv4();
  const refreshToken = jwt.sign(
    { id: id, userId: user.id, userRole: user.role },
    refreshSecret,
    {
      expiresIn: "1d",
    }
  );

  try {
    const tokenObject = { id: id, token: refreshToken, userId: user.id };
    await AuthService.createToken(tokenObject);

    response.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000,
    });
    response.cookie("accessToken", accessToken, {
      httpOnly: true,
      maxAge: 10 * 60 * 1000,
    });
    return response.status(200).json({ message: "Success login" });
  } catch (error: any) {
    return response.status(500).json(error.message);
  }
};

export const refresh = async (request: Request, response: Response) => {
  const token = request.cookies.refreshToken;
  const verified = jwt.verify(token, refreshSecret) as {
    id: string;
    userId: string;
    userRole: string;
  };
  if (verified) {
    try {
      const existingToken = await AuthService.getToken(verified.id);
      if (existingToken) {
        const accessToken = jwt.sign(
          { userId: verified.userId, userRole: verified.userRole },
          accessSecret,
          {
            expiresIn: "10m",
          }
        );

        return response.cookie("accessToken", accessToken, {
          httpOnly: true,
          maxAge: 10 * 60 * 1000,
        });
      }
      return response.status(404).json("Refresh token is not valid");
    } catch (error: any) {
      return response.status(500).json(error.message);
    }
  }
  return response.status(404).json("Refresh token is not valid");
};
