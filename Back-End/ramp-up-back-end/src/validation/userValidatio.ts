import { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";

export const registerUserRules = () => {
  return [
    body("name", "Name is requied").notEmpty(),
    body("email", "Enter Valid Email").notEmpty().isEmail(),
    body("password", "Enter Valid Password")
      .notEmpty()
      .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
  ];
};

export const userValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
};
