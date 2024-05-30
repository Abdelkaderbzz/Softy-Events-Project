import Joi from '@hapi/joi';

export const uploadFileSchema = Joi.object({
  file: Joi.any().required(),
});
