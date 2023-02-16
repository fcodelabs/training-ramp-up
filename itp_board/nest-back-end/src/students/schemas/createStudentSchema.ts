import * as Joi from 'joi';

export const CreateStudentSchema = Joi.object({
  id: Joi.number().required(),
  // name: string;
  name: Joi.string()
    .required()
    .pattern(
      /^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/,
    ),

  // address: string;
  address: Joi.string().required(),
  // dateOfBirth: Date;
  dateOfBirth: Joi.date()
    .max(subtractYears(new Date(), 18))
    .min(1900)
    .required(),
  // gender: string;
  gender: Joi.string().required().valid('male', 'female'),
  // mobileNo: string;
  mobileNo: Joi.string()
    .required()
    .pattern(/^(0|\+94)(11|71|70|77|76|75|78)-?\d{7}$/),
}).options({
  abortEarly: false,
});

function subtractYears(date, years) {
  date.setFullYear(date.getFullYear() - years);
  return date;
}
