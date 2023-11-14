import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as AuthController from "../controllers/auth.controllers";
const cookieParser = require("cookie-parser");

const accessSecret: string = process.env.JWT_ACCESS_SECRET || "";
interface ParsedCookies {
  [key: string]: string;
}
export const AuthenticationMiddleware =
  (allowedUser: string) =>
  async (request: Request, response: Response, next: NextFunction) => {
    try {
      const list: ParsedCookies = {};
      const cookieHeader = request.headers?.cookie;
      if (!cookieHeader) return list;

      cookieHeader.split(`;`).forEach(function (cookie) {
        let [name, ...rest] = cookie.split(`=`);
        name = name?.trim();
        if (!name) return;
        const value = rest.join(`=`).trim();
        if (!value) return;
        list[name] = decodeURIComponent(value);
      });
      const token = list["accessToken"];
      console.log(token);
      try {
        const decodedToken = jwt.verify(token, accessSecret) as {
          userRole: string;
          exp: number;
        };
        if (decodedToken.userRole === allowedUser) {
          return next;
        }
        return response.status(401).json({ message: "Unauthorized access" });
      } catch (error: any) {
        if (error.name === "TokenExpiredError") {
          return AuthController.refresh;
        } else {
          return response.status(401).json({ message: "Unauthorized access" });
        }
      }
    } catch {
      return response.status(401).json({ message: "Unauthorized access" });
    }
  };
