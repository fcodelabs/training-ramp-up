"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentValidation = void 0;
const express_validator_1 = require("express-validator");
exports.createStudentValidation = [
    (0, express_validator_1.body)('id').isInt().notEmpty().withMessage('ID must be an integer'),
    (0, express_validator_1.body)('name').isString().notEmpty().withMessage('Name is required and must be a string'),
    (0, express_validator_1.body)('gender').isIn(['Male', 'Female', 'Other']).withMessage('Invalid gender'),
    (0, express_validator_1.body)('address').isString().notEmpty().withMessage('Address is required and must be a string'),
    (0, express_validator_1.body)('mobileno').isString().notEmpty().withMessage('Mobile number is required and must be a string'),
    (0, express_validator_1.body)('dob').isString().withMessage('Invalid date of birth'),
];
//# sourceMappingURL=createStudentValidation.js.map