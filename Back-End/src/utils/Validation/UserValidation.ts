import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const userSignupValidationRules = () => {
  return [
    body('email', 'Email is required').notEmpty().isEmail(),
    body('password', 'Password is required').notEmpty().isLength({ min: 6 }),
  ];
};

export const userLoginValidationRules = () => {
  return [
    body('email', 'Email is required').notEmpty().isEmail(),
    body('password', 'Password is required').notEmpty().isLength({ min: 6 }),
  ];
};

export const refreshTokenValidationRules = () => {
  return [body('refreshToken', 'Refresh token is required').notEmpty()];
};

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
