import {body} from "express-validator";
export const userValidations = [
    body('email','Invalid Email').isEmail().normalizeEmail(),

    body('firstName','Invalid First name')
        .exists({checkFalsy:true})
        .bail()
        .isString().trim().escape()
        .bail()
        .not()
        .matches(/\d/)
        .bail()
        .not()
        .matches(/\W/),

    body('lastName','Invalid Last name')
        .exists({checkFalsy:true})
        .bail()
        .isString().trim().escape()
        .bail()
        .not()
        .matches(/\d/)
        .not()
        .matches(/\W/),

    body('password', 'Password requires at least 8 characters, 1 uppercase letter, 1 lowercase letter, 1 number and one special character')
        .exists({checkFalsy:true})
        .bail()
        .isString()
        .bail()
        .isLength({ min: 8 })
        .bail()
        .matches(/[a-z]/)
        .bail()
        .matches(/[A-Z]/)
        .bail()
        .matches(/\W/)
        .bail()
        .matches(/\d/)
        .bail(),

    body('admin','Invalid Privilege')
        .exists({checkNull:true})
        .bail()
        .toBoolean()
        .isBoolean()


]
