import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const studentValidation = (req: Request, res: Response, next: NextFunction) => {
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

export const studentAddValidationRules = () => {
  return [
    body('name').notEmpty().withMessage('Name must be between 3 and 50 characters'),
    body('gender').not().isEmpty().isIn(['Male', 'Female']).withMessage('Gender is Required'),
    body('address').notEmpty().withMessage('Address must be between 3 and 50 characters'),
    body('mobile').notEmpty().isLength({ min: 10, max: 10 }).withMessage('Enter a valid mobile number'),
    body('birthday').notEmpty().withMessage('Birthday is Required'),
    body('age').notEmpty().isInt({ min: 18, max: 100 }).withMessage('Age must be greater than 18'),
  ];
};
