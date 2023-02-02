import {body} from 'express-validator'

export const studentValidations = [

    body('name')
        .exists({checkFalsy:true})
        .bail()
        .matches(/^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/),


    body('gender','Invalid Gender')
        .exists({checkFalsy:true})
        .bail()
        .isString().trim().escape()
        .bail()
        .isIn(['female','male']),

    body('address','Invalid Address')
        .exists({checkFalsy:true})
        .bail()
        .isString(),

    body('mobileNo','Invalid Mobile Number Number')
        .exists()
        .bail()
        .isString().trim().escape()
        .bail()
        .matches(/^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/),

    body('dateOfBirth',"Invalide Date of Birth")
        .exists({checkFalsy:true})
        .bail()
        .custom(
            (value)=>{
                const dob = new Date(value);
                return calculateAge(dob)>=18
            }
        )


]

const calculateAge = (dob: Date) => {
    return Math.floor((Date.now() - dob.getTime()) / (1000 * 3600 * 24) / 365.25)
}