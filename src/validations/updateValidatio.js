import Joi from "joi";

const UbookValidation = (request, response, next) => {
  const book = { ...request.body };

  const validation = Joi.object({
    title: Joi.string()
      .min(5)
      .max(50)
      .pattern(/^[\u0600-\u06ffa-zA-Z ]{5,50}$/),
    description: Joi.string().min(10).max(200),
    authors: Joi.array().items(
      Joi.string()
        .min(5)
        .max(50)
        .pattern(/^[\u0600-\u06ffa-zA-Z ]{5,50}$/)
    ),
    price: Joi.number(),
    quantity: Joi.number(),
    image: Joi.string(),
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

export default UbookValidation;
