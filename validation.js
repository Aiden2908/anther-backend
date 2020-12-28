const Joi = require("joi");

const signupSchema = () =>
  Joi.object({
    email: Joi.string().email().required(),
    username: Joi.string().min(3).required(),
    password: Joi.string().min(6).required(),
  });

const loginSchema = () =>
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });
module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;
