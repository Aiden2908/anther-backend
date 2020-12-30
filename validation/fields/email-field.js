module.exports = (Joi) => {
  return Joi.string().max(255).email().required().messages({
    "string.base": `email should be a type of 'text'`,
    "string.empty": `sorry, email cannot be empty, please try again.`,
    "string.email": `sorry, email is not valid, please try again.`,
    "string.max": `sorry, email must not be more than {#limit} characters, please try again.`,
  });
};
