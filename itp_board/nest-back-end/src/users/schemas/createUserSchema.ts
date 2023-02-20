import * as Joi from 'joi';

export const CreateUserSchema = Joi.object({
  email: Joi.string().email().required(),

  firstName: Joi.string()
    .required()
    .pattern(
      /^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/,
    ),

  lastName: Joi.string()
    .required()
    .pattern(
      /^[A-Z][a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[A-Z][a-z]*)*)$|^[a-z]+((\s[a-z]*)*)$|^[A-Z][a-z]+((\s[a-z]*)*)$/,
    ),

  password: Joi.string()
    .required()
    .pattern(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
    ),

  admin: Joi.boolean().optional(),
});
