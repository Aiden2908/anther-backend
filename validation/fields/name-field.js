module.exports = (Joi) => {
  return Joi.string().min(3).max(16).required().messages({
    "string.base": `username should be a type of 'text'`,
    "string.empty": `sorry, username cannot be empty, please try again.`,
    "string.min": `sorry, username must be at least {#limit} or more characters, please try again.`,
    "string.max": `sorry, username must not be more than {#limit} characters, please try again.`,
  });
};
