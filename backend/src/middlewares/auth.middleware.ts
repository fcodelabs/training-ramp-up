import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as AuthController from "../controllers/auth.controllers";
const accessSecret: string = process.env.JWT_ACCESS_SECRET || "";
const refreshSecret: string = process.env.JWT_ACCESS_SECRET || "";

export const AuthenticationMiddleware =
  (allowedUser: string) =>
  async (request: Request, response: Response, next: NextFunction) => {
    const token = request.cookies.accessToken;
    if (!token) {
      return response
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }
    try {
      const decodedToken = jwt.verify(token, refreshSecret) as {
        userRole: string;
        exp: number;
      };
      if (decodedToken.userRole === allowedUser) {
        return next;
      }
      if (Date.now() >= decodedToken.exp * 1000) {
        AuthController.refresh;
      }
      return response.status(401).json({ message: "Unauthorized access" });
    } catch {
      return response
        .status(401)
        .json({ message: "Unauthorized: Token not provided" });
    }
  };
