const Joi = require("joi");
const name = require("../validation/fields/name-field");
const email = require("../validation/fields/email-field");
const password = require("../validation/fields/password-field");

const signupSchema = () =>
  Joi.object({
    email: email(Joi),
    name: name(Joi),
    password: password(Joi),
  });

const loginSchema = () =>
  Joi.object({
    email: email(Joi),
    password: password(Joi),
  });
module.exports.signupSchema = signupSchema;
module.exports.loginSchema = loginSchema;
