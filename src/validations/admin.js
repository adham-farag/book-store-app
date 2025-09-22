import joi from "joi";

const adminvalidation = (request, response, next) => {
  const admin = { ...request.body };

  const validation = joi
    .object({
      name: joi
        .string()
        .min(3)
        .max(20)
        .pattern(/^[\u0600-\u06ffa-zA-Z ]{3,20}$/)
        .required(),
      email: joi.string().email().min(7).max(40).required(),
      password: joi.string().min(2).max(20).required(),
    })
    .validate(admin);

  if (validation.error) {
    return response.status(400).json({
      status: "error",
      msg: validation.error,
    });
  }
  next();
};

export default adminvalidation;
