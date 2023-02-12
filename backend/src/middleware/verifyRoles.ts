import { NextFunction, Request, Response } from "express";

const verifyRoles = (allowedRoles: any) => {
  return (req: any, res: Response, next: NextFunction) => {
    const userRole = req.userRole;
    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).send("You are not authorized to access this resource");
    }
  };
};
export default verifyRoles;
