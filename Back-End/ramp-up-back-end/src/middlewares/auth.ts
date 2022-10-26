import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { config } from "../utils/config";

export const authorization = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  console.log(token);
  if (!token) {
    return res.sendStatus(403).send("Token not found");
  }
  try {
    const data = jwt.verify(token, config.jwt_secret_key);
    console.log(data);
    return next();
  } catch {
    return res.sendStatus(403);
  }
};

export const authPermissions = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.accessToken;
  if (!token) {
    return res.sendStatus(403);
  }

  if (req.method == "GET") {
    try {
      jwt.verify(token, config.jwt_secret_key);
      return next();
    } catch {
      return res.sendStatus(401).send("Invalid Token");
    }
  } else {
    try {
      const data = jwt.verify(token, config.jwt_secret_key);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      //@ts-ignore
      if (data.role !== "admin") {
        return res.status(401).send("Do not have Permission");
      } else {
        return next();
      }
    } catch {
      return res.status(401).send("Invalid Token");
    }
  }
};
