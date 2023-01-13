"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentValidation = exports.studentPatchValidationRules = exports.studentAddValidationRules = void 0;
const express_validator_1 = require("express-validator");
const studentAddValidationRules = () => {
    return [
        (0, express_validator_1.body)('name', 'Name is required').notEmpty(),
        (0, express_validator_1.body)('gender', 'Gender is required').not().isEmpty().isIn(['Male', 'Female']),
        (0, express_validator_1.body)('address', 'Address is required').not().isEmpty(),
        (0, express_validator_1.body)('mobile', 'Include a valid mobile number').isNumeric().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)('birthday', 'Birthday is required & Couldnt be a future date').not().isEmpty().toDate().isBefore(),
    ];
};
exports.studentAddValidationRules = studentAddValidationRules;
const studentPatchValidationRules = () => {
    return [
        (0, express_validator_1.body)('id', 'Id is required').optional().notEmpty().isNumeric(),
        (0, express_validator_1.body)('name', 'Name is required').optional().notEmpty(),
        (0, express_validator_1.body)('gender', 'Gender is required').optional().not().isEmpty().isIn(['Male', 'Female']),
        (0, express_validator_1.body)('address', 'Address is required').optional().not().isEmpty(),
        (0, express_validator_1.body)('mobile', 'Include a valid mobile number').optional().isNumeric().isLength({ min: 10, max: 10 }),
        (0, express_validator_1.body)('birthday', 'Birthday is required & Couldnt be a future date').optional().not().isEmpty().toDate().isBefore(),
    ];
};
exports.studentPatchValidationRules = studentPatchValidationRules;
const studentValidation = (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (errors.isEmpty()) {
        return next();
    }
    const extractedErrors = [];
    errors.array().map((err) => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({
        errors: extractedErrors,
    });
};
exports.studentValidation = studentValidation;
