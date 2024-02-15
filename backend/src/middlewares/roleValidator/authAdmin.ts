import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { AppDataSource } from "../../index";
import { User } from "../../models/user";
import dotenv from "dotenv";
dotenv.config();

//const SECRET_KEY = process.env.JWT_SECRET_KEY!;
const SECRET_KEY =
  "909ea6a39b4cf63377b5e5c4f8b8a76e52be06b0fc7af427ba38ce8a8c8a6458";

export const authAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const token = req.cookies.token;
  console.log("token", token);

  if (!token) {
    console.log("no token");
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const decodedToken: any = jwt.verify(token, SECRET_KEY);
    const userRepo = AppDataSource.getRepository(User);
    const user = await userRepo.findOne({
      where: { email: decodedToken.email },
    });

    console.log("user admin here", user);
    if (!user || user.role !== "Admin") {
      console.log("no user");
      return res.status(401).json({ error: "Unauthorized" });
    }

    //req.user = user;
    console.log("auth admin success");
    next();
  } catch (error) {
    console.log("error", error);
    return res.status(401).json({ error: "Unauthorized" });
  }
};
