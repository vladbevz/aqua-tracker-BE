import Joi from 'joi';
import { emailRegexp } from '../constants/users.js';
export const refreshSchema = Joi.object({
  refreshToken: Joi.string().required(),
});

export const userInfoUpdatedSchema = Joi.object({
  name: Joi.string().max(32),
  email: Joi.string().pattern(emailRegexp).messages({
    'string.base': 'Email must be a string.',
    'string.empty': 'Email must not be empty.',
    'string.pattern.base': "Email must be in the format 'example@example.com'.",
  }),
  outdatedPassword: Joi.string().min(8).max(64),
  newPassword: Joi.string().min(8).max(64),
  gender: Joi.string().valid('male', 'female').messages({
    'any.only': "Gender must be either 'male' or 'female'.",
  }),
});
