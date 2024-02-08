import { body } from "express-validator";


export const studentValidation = [
    body('id').isInt().notEmpty().withMessage('ID must be an integer'),
    body('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    body('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    body('address').isString().notEmpty().withMessage('Address is required and must be a string'),
    body('mobile').isString().notEmpty().withMessage('Mobile number is required and must be a string'),
    body('dob').isString().withMessage('Invalid date of birth'),
 
];