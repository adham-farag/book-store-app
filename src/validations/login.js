import joi from "joi";

const loginValidation = (request, response, next) => {
  const admin = { ...request.body };

  const validation = joi
    .object({
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

export default loginValidation;
