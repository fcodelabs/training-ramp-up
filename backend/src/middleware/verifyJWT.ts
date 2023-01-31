import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const PORT = "5000";

dotenv.config();

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader?.startsWith("Bearer")) return res.sendStatus(401);
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, decoded: any) => {
      if (err) return res.sendStatus(403); //forbidden
      req.userEmail = decoded.userInfo.userEmail;
      req.userRole = decoded.userInfo.userRole;
      next();
    }
  );
};
