import dotenv from "dotenv";
import jwt from "jsonwebtoken";

const PORT = "5000";

dotenv.config();

export const verifyJWT = (req: any, res: any, next: any) => {
  const authHeader = req.headers["authorization"];

  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);
  console.log(token);
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET as string,
    (err: any, user: any) => {
      if (err) return res.sendStatus(403); //forbidden
      req.user = user;
      next();
    }
  );
};
