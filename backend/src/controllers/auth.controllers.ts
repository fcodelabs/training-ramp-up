import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as UserServices from "../services/user.services";

import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await UserServices.findUserByEmail(email);
  const secret: string = process.env.JWT_ACCESS_SECRET || "";

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, secret, {
    expiresIn: "1h",
  });

  response.json({ token });
};
