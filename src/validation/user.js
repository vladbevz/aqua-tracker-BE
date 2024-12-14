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

export const userRegisterSchema = Joi.object({
  // gender: Joi.string().valid('woman', 'man').default('woman').messages({
  //   'any.only': 'Gender must be one of "woman" or "man"',
  // }),
  // name: Joi.string().min(2).max(100).messages({
  //   'string.min': 'Name must have at least 2 characters',
  //   'string.max': 'Name can have up to 100 characters',
  // }),
  email: Joi.string().pattern(emailRegexp).email().required().messages({
    'string.pattern.base': 'Email format is invalid',
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),
  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
  // avatarUrl: Joi.string().uri().allow('').messages({
  //   'string.uri': 'Avatar URL must be a valid URI',
  // }),
  // daylyNorm: Joi.number().min(0).max(15000).messages({
  //   'number.min': 'Daily norm must be at least 0 ml',
  //   'number.max': 'Daily norm cannot exceed 15000 ml',
  // }),
});

export const userLoginSchema = Joi.object({
  email: Joi.string().email().required().messages({
    'string.email': 'Email must be a valid email',
    'string.empty': 'Email is required',
  }),

  password: Joi.string().min(8).max(64).required().messages({
    'string.min': 'Password must be at least 8 characters',
    'string.max': 'Password can be up to 64 characters',
    'string.empty': 'Password is required',
  }),
});
