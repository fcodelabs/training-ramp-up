const { check, validationResult } = require("express-validator");

export const validateData = [
  check("data.PersonID")
    .not()
    .isEmpty()
    .isInt({ gt: -1 })
    .withMessage("Invalid value"),
  check("data.PersonName")
    .not()
    .isEmpty()
    .isLength({ min: 5, max: 15 })
    .withMessage("Invalid value"),
  check("data.PersonGender")
    .not()
    .isEmpty()
    .isIn(["Female", "Male"])
    .withMessage("Invalid value"),
  check("data.PersonAddress").not().isEmpty().withMessage("Invalid value"),
  check("data.PersonMobileNo")
    .not()
    .isEmpty()
    .matches(/^(\+\d{11}|\d{10})$/g)
    .withMessage("Invalid value"),
  check("data.DateOfBirth")
    .not()
    .isEmpty()
    .withMessage("Invalid value")
    .custom((value: string | number | Date) => {
      const today = new Date();
      const birthDate = new Date(value);
      const age = today.getFullYear() - birthDate.getFullYear();
      if (age < 19) {
        throw new Error("Age must be 18 or above");
      }
      return true;
    }),
];

export const validate = (req: any, res: any, next: () => void) => {
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
