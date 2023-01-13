import { body, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

export const studentAddValidationRules = () => {
  return [
    body('name', 'Name is required').notEmpty(),
    body('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'Female']),
    body('address', 'Address is required').not().isEmpty(),
    body('mobile', 'Include a valid mobile number').isNumeric().isLength({ min: 10, max: 10 }),
    body('birthday', 'Birthday is required & Couldnt be a future date').not().isEmpty().toDate().isBefore(),
  ];
};

export const studentPatchValidationRules = () => {
  return [
    body('id', 'Id is required').optional().notEmpty().isNumeric(),
    body('name', 'Name is required').optional().notEmpty(),
    body('gender', 'Gender is required').optional().not().isEmpty().isIn(['Male', 'Female']),
    body('address', 'Address is required').optional().not().isEmpty(),
    body('mobile', 'Include a valid mobile number').optional().isNumeric().isLength({ min: 10, max: 10 }),
    body('birthday', 'Birthday is required & Couldnt be a future date').optional().not().isEmpty().toDate().isBefore(),
  ];
};

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
