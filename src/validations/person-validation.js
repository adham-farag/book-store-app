import joi from "joi";

const personValidation = (request, response, next) => {
  const customer = { ...request.body };

  const validation = joi
    .object({
      name: joi
        .string()
        .min(3)
        .max(20)
        .pattern(/^[\u0600-\u06ffa-zA-Z0-9 ]{3,20}$/),
      email: joi.string().email().min(7).max(40),
      password: joi.string().min(2).max(20),
    })
    .validate(customer);

  if (validation.error) {
    return response.status(400).json({
      status: "error",
      msg: validation.error,
    });
  }
  next();
};

export default personValidation;
