import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userValidation = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors: { [key: string]: string }[] = [];
  errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
  return res.status(422).json({
    errors: extractedErrors,
  });
};

export const userSignUpOrSignInValidationRules = () => {
  return [
    body('email').notEmpty().isEmail().withMessage('Email is Required'),
    body('password').notEmpty().isLength({ min: 8 }).withMessage('Password must be at least 8 characters'),
  ];
};
