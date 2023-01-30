const { check, validationResult } = require("express-validator");

export const validateData = [
  check("data.PersonID").not().isEmpty().withMessage("Invalid value"),
  check("data.PersonName").not().isEmpty().withMessage("Invalid value"),
  check("data.PersonGender").not().isEmpty().withMessage("Invalid value"),
  check("data.PersonAddress").not().isEmpty().withMessage("Invalid value"),
  check("data.PersonMobileNo")
    .not()
    .isEmpty()
    .matches(/^[+]*[0-9]{10}$/)
    .withMessage("Invalid value"),
  check("data.DateOfBirth").not().isEmpty().withMessage("Invalid value"),
];

export const validata = (req: any, res: any, next: () => void) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
