import Joi from "@hapi/joi";
import { JoiAuthBearer, JoiObjectId } from "../../../helpers/validator";

export default {
  userLogin: Joi.object().keys({
    email: Joi.string().email(),
    password: Joi.string().required().min(6),
  }),

  refreshToken: Joi.object().keys({
    refreshToken: Joi.string().required().min(1),
  }),
  confirmEmail: Joi.object().keys({
    email: Joi.string().email().required(),
    code: Joi.string().required().min(1).max(6),
  }),

  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
  signup: Joi.object().keys({
    firstName: Joi.string().required().min(3),
    lastName: Joi.string().optional().min(3),
    userName: Joi.string().optional().min(3),
    email: Joi.string().required().email(),
    phoneNumber: Joi.string().optional().min(8),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/)
      .messages({
        "string.pattern.base":
          "Password must be 8-30 characters long and contain only alphanumeric characters.",
        "any.required": "Password is required.",
      }),
    userType: JoiObjectId().optional(),
  }),
  forgetPassword: Joi.object().keys({
    email: Joi.string().required().email(),
  }),
  resetPassword: Joi.object().keys({
    resetCode: Joi.string().required().min(6).max(6),
    password: Joi.string()
      .required()
      .regex(/^[a-zA-Z0-9]{8,30}$/),
  }),
};
