import Joi from "joi";

export const userSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).required().messages({
    "string.empty": "First name is required",
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must not exceed 255 characters",
  }),
  lastName: Joi.string().min(2).max(255).required().messages({
    "string.empty": "Last name is required",
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must not exceed 255 characters",
  }),
  email: Joi.string().email().max(255).required().messages({
    "string.empty": "Email is required",
    "string.email": "Email format is invalid",
    "string.max": "Email must not exceed 255 characters",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .required()
    .messages({
      "string.empty": "Phone number is required",
      "string.pattern.base": "Phone number must be exactly 10 digits",
    }),
  image: Joi.string().uri().optional().allow(null, ""),
  password: Joi.string().min(6).required().messages({
    "string.empty": "Password is required",
    "string.min": "Password must be at least 6 characters long",
  }),
});

export const userUpdateSchema = Joi.object({
  firstName: Joi.string().min(2).max(255).messages({
    "string.min": "First name must be at least 2 characters long",
    "string.max": "First name must not exceed 255 characters",
  }),
  lastName: Joi.string().min(2).max(255).messages({
    "string.min": "Last name must be at least 2 characters long",
    "string.max": "Last name must not exceed 255 characters",
  }),
  email: Joi.string().email().max(255).messages({
    "string.email": "Email format is invalid",
    "string.max": "Email must not exceed 255 characters",
  }),
  phone: Joi.string()
    .pattern(/^\d{10}$/)
    .messages({
      "string.pattern.base": "Phone number must be exactly 10 digits",
    }),
  image: Joi.string().uri().allow(null, ""),
  password: Joi.string().min(6).messages({
    "string.min": "Password must be at least 6 characters long",
  }),
})
  .min(1)
  .messages({
    "object.min": "At least one field must be updated",
  });
