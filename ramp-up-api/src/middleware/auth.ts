import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers["x-access-token"] as string;

  if (!token) {
    return res.status(403).send("A token is required for authentication");
  }
  if (req.method == "GET") {
    try {
      jwt.verify(token, process.env.TOKEN_KEY as string);
      return next();
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } else {
    try {
      const payload = jwt.verify(token, process.env.TOKEN_KEY as string);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      if (payload.role !== "Admin") {
        return res.status(401).send("Unauthorized");
      } else {
        return next();
      }
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  }
};

export default verifyToken;
