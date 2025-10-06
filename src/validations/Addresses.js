import Joi from "joi";

const addressValidation = (req, res, next) => {
  const address = { ...req.body };

  const validation = Joi.object({
    country: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[\u0600-\u06ffa-zA-Z ]{2,20}$/)
      .required(),
    city: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[\u0600-\u06ffa-zA-Z ]{2,20}$/)
      .required(),
    street: Joi.string()
      .min(2)
      .max(20)
      .pattern(/^[\u0600-\u06ffa-zA-Z ]{2,20}$/)
      .required(),
    apartmentNumber: Joi.number().required(),
  }).validate(address);

  if (validation.error) {
    return res.status(400).json({
      status: "error",
      msg: validate.error.details,
    });
  }
  next();
};

export default addressValidation;
