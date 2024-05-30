import Joi from "@hapi/joi";
import { JoiObjectId } from "../../../helpers/validator";
import { PostType } from "../../../database/model/post";
import { advStatus } from "../../../database/model/advertisingRequest";

export default {
  requestId: Joi.object().keys({
    requestId: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    sponsor: JoiObjectId().required(),
    product: JoiObjectId().required(),
    status: Joi.string()
      .valid(...Object.values(advStatus))
      .required(),
    description: Joi.string().optional().empty(""),
  }),
  update: Joi.object().keys({
    product: JoiObjectId().optional(),
    status: Joi.string()
      .valid(...Object.values(advStatus))
      .optional(),
    description: Joi.string().optional().empty(""),
  }),
};
