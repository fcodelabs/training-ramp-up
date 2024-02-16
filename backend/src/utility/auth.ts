import Jwt from "jsonwebtoken";
import { Response } from "express";

interface ITokenPayload {
  userEmail: string;
  role: string;
}

export const createToken = (res: Response, payload: ITokenPayload) => {
  console.log(process.env.JWT_SECRET);
  const token = Jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: "1h",
  });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 3600000,
  });
};

export const clearToken = (res: Response) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
};
