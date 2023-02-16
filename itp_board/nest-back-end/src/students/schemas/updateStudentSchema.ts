import * as Joi from 'joi';

export const UpdateStudentSchema = Joi.object({
  id: Joi.number().required(),
  // name: string;
  name: Joi.string()
    .optional()
    .pattern(
      /^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/,
    ),

  // address: string;
  address: Joi.string().optional(),
  // dateOfBirth: Date;
  dateOfBirth: Joi.date()
    .optional()
    .max(subtractYears(new Date(), 18))
    .min(1900),
  // gender: string;
  gender: Joi.string().valid('male', 'female').optional(),
  // mobileNo: string;
  mobileNo: Joi.string()
    .pattern(/^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/)
    .optional(),
}).options({
  abortEarly: false,
});

function subtractYears(date, years) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}
