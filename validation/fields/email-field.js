module.exports = (Joi) => {
  return Joi.string().max(255).email().required().messages({
    "string.base": `Sorry, email is not valid, please try again.`,
    "string.empty": `Sorry, email cannot be empty, please try again.`,
    "string.email": `Sorry, email is not valid, please try again.`,
    "string.max": `Sorry, email must not be more than {#limit} characters, please try again.`,
    "any.required": `Sorry, email is required, please try again.`,
  });
};
