import Joi from "joi";

const bookValidation = (request, response, next) => {
  const book = { ...request.body };

  const validation = Joi.object({
    title: Joi.string()
      .min(5)
      .max(50)
      .pattern(/^[\u0600-\u06ffa-zA-Z ]{5,50}$/)
      .required(),
    description: Joi.string().min(10).max(200).required(),
    authors: Joi.array()
      .items(
        Joi.string()
          .min(5)
          .max(50)
          .pattern(/^[\u0600-\u06ffa-zA-Z ]{5,50}$/)
      )
      .required(),
  }).validate(book);

  if (validation.error) {
    return response.status(400).json({
      status: "error",
      code: "400",
      msg: validation.error.details,
    });
  }

  next();
};

export default bookValidation;
