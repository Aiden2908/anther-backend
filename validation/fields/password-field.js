module.exports = (Joi) => {
  return Joi.string().max(255).min(4).required().messages({
    "string.base": `Sorry, password is not valid, please try again.`,
    "string.empty": `Sorry, password cannot be empty, please try again.`,
    "string.min": `Sorry, password must be atleast {#limit} or more characters, please try again.`,
    "string.max": `Sorry, password must not be more than {#limit} characters, please try again.`,
  });
};
