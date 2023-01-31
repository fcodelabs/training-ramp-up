import { NextFunction, Request, Response } from "express";

const verifyRoles = (allowedRoles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.userRole;
    if (!allowedRoles.includes(userRole)) {
      console.log("userRole", userRole);
      next();
    } else {
      next();
    }
  };
};
export default verifyRoles;
