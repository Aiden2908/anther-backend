module.exports = (Joi) => {
  return Joi.string().max(255).min(4).required().messages({
    "string.base": `password should be a type of 'text'`,
    "string.empty": `sorry, password cannot be empty, please try again.`,
    "string.min": `sorry, password must be atleast {#limit} or more characters, please try again.`,
    "string.max": `sorry, password must not be more than {#limit} characters, please try again.`,
  });
};
