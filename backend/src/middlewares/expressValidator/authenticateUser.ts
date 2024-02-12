import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../index";
import { User } from "../../models/user";
import dotenv from "dotenv";
dotenv.config();

const SECRET_KEY = process.env.JWT_SECRET_KEY!;

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.log("authenticateUser");
  const token = req.cookies.token;
  const refreshToken = req.cookies.refreshToken;
  console.log("refreshToken", refreshToken);
  console.log("token", token);
  if (!token && !refreshToken) {
    console.log("no token authenticate");
    return res.status(401).json({ error: "user not logged in" });
  }

  if (!token && refreshToken) {
    console.log("forbidden");
    return res.status(403).json({ error: "forbidden" });
  }

  try {
    const decodedToken: any = jwt.verify(token, SECRET_KEY);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email: decodedToken.email },
    });

    if (!user) {
      console.log("no user authenticate");
      return res.status(401).json({ error: "user does not exists" });
    }

    //req.user = user;
    console.log("user", user);
    next();
  } catch (error) {
    console.log("error authenticate", error);
    return res.status(401).json({ error: "error while authenticating" });
  }
};
