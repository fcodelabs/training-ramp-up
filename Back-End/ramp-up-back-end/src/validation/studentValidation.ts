import { validationResult, body } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const addStudentRules = () => {
  return [
    body("name", "Name is requied").notEmpty(),
    body("gender", "Gender is requied")
      .not()
      .isEmpty()
      .isIn(["Male", "Female"]),
    body("address", "Address is requied").not().isEmpty(),
    body("mobile", "Please include a valid Mobile Number")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    body("birthday", "Please include a valid Birthday")
      .not()
      .isEmpty()
      .toDate()
      .isISO8601(),
    body("age", "Age is Required").isNumeric().isLength({ min: 1, max: 2 }),
  ];
};

export const updateStudentRules = () => {
  return [
    body("name", "Name is requied").notEmpty(),
    body("gender", "Gender is requied")
      .not()
      .isEmpty()
      .isIn(["Male", "Female"]),
    body("address", "Address is requied").not().isEmpty(),
    body("mobile", "Please include a valid Mobile Number")
      .isNumeric()
      .isLength({ min: 9, max: 10 }),
    body("birthday", "Please include a valid Birthday")
      .not()
      .isEmpty()
      .toDate()
      .isISO8601(),
    body("age", "Age is Required").isNumeric().isLength({ min: 1, max: 2 }),
  ];
};

export const studentValidation = (
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
