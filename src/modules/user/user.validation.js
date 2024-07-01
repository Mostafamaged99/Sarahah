import Joi from "joi";

let signupVal = Joi.object({
  userName: Joi.string().min(2).max(20).required(),
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});

let signinVal = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/),
});
export { signupVal, signinVal };
