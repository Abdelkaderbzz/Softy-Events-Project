import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';
import { PostStatus, PostType } from '../../../database/model/post';

export default {
  postId: Joi.object().keys({
    postId: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    title: Joi.string().min(1).max(100).required(),
    content: Joi.string().min(1).max(300).required(),
    date: Joi.date().required(),
    postPicUrl: Joi.any(),
    postType: Joi.string()
      .valid(...Object.values(PostType))
      .required(),
  }),
  update: Joi.object().keys({
    title: Joi.string().min(1).max(100).optional(),
    content: Joi.string().min(1).max(300).optional(),
  }),
  updateStatus: Joi.object().keys({
    status: Joi.string()
      .valid(...Object.values(PostStatus))
      .required(),
  }),
};
