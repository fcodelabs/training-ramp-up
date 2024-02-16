import { body } from 'express-validator';

const isEmailValid = (value: string): boolean => {
  // Use your preferred email validation logic, for example, a regular expression
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(value);
};

export const userValidation = [
  body('name').isString().withMessage('Name must be a string'),
  body('name').notEmpty().withMessage('Name is required.'),
  body('email')
  .custom((value) => isEmailValid(value))
  .withMessage('Invalid email address'),
  body('email').notEmpty().withMessage('Email is required.'),
];
