import Joi from "joi";
export const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid("student", "teacher", "admin", "superadmin"),
  class: Joi.number().min(1).max(12),
  phone: Joi.string().length(10),
});
export const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});
