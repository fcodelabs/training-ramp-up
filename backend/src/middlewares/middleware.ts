import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { roles } from "../constants";

export function authenticate() {
  return function (req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.jwt;
      console.log(token);
      if (!token) {
        return res.status(401).json({ message: "Token not found" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET) as JwtPayload;

      if (!decoded || !decoded.role || !decoded.userEmail) {
        return res.status(401).json({ message: "Token not valid" });
      }

      const { userEmail, role } = decoded;
      req.user = { email: userEmail, role: role };
      next();
    } catch (error) {
      return res.status(401).json({ message: "Token not valid" });
    }
  };
}
export function checkPermission(permission: string) {
  return function (req: Request, res: Response, next: NextFunction) {
    const userRole = req.user?.role;
    const userPermissions = roles[(userRole as string).toLowerCase()];
    if (!userPermissions || !userPermissions.includes(permission)) {
      console.log("You don't have permission");
      return res.status(403).json({ message: "You don't have permission" });
    }
    next();
  };
}
