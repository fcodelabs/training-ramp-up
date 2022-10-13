//const { check } = require("express-validator");
import { check, validationResult } from "express-validator";
import { NextFunction, Request, Response } from "express";

export const addStudentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateArray = [
    check("name", "Name is requied").notEmpty(),
    check("gender", "Gender is requied")
      .not()
      .isEmpty()
      .isIn(["Male", "Female"]),
    check("address", "Address is requied").not().isEmpty(),
    check("mobile", "Please include a valid Mobile Number")
      .isNumeric()
      .isLength({ min: 10, max: 10 }),
    check("birthday", "Please include a valid Birthday")
      .not()
      .isEmpty()
      .toDate()
      .isISO8601(),
    check("age", "Age is Required").isNumeric().isLength({ min: 1, max: 2 }),
  ];

  const errors = validationResult(validateArray);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
};

export const updateStudentValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const validateArray = [
    check("name", "Name is requied").notEmpty(),
    check("gender", "Gender is requied")
      .not()
      .isEmpty()
      .isIn(["Male", "Female"]),
    check("address", "Address is requied").not().isEmpty(),
    check("mobile", "Please include a valid Mobile Number")
      .isNumeric()
      .isLength({ min: 9, max: 10 }),
    check("birthday", "Please include a valid Birthday")
      .not()
      .isEmpty()
      .toDate()
      .isISO8601(),
    check("age", "Age is Required").isNumeric().isLength({ min: 1, max: 2 }),
  ];

  const errors = validationResult(validateArray);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  } else {
    return next();
  }
};
