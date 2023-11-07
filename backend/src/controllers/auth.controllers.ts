import { Request, Response } from "express";
import bcrypt from "bcrypt";
import * as AuthServices from "../services/auth.services";

import jwt from "jsonwebtoken";

export const login = async (request: Request, response: Response) => {
  const { email, password } = request.body;

  const user = await AuthServices.findUserByEmail(email);
  const secret: string = process.env.JWT_ACCESS_SECRET || "";

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return response.status(401).json({ message: "Invalid email or password" });
  }

  const token = jwt.sign({ userId: user.id }, secret, {
    expiresIn: "1h",
  });

  response.json({ token });
};
