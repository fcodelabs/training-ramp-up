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
  const token = req.cookies.token;
  console.log("token", token);
  if (!token) {
    console.log("no token authenticate");
    return res.status(401).json({ error: "user not logged in" });
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
