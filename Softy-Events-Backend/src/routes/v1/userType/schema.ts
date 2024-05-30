import Joi from '@hapi/joi';
import { UserTypeCode } from '../../../database/model/UserType';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  param: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
  create: Joi.object().keys({
    name: Joi.string()
      .valid(UserTypeCode.MEMBER, UserTypeCode.SPONSOR)
      .required(),
  }),
  update: Joi.object().keys({
    name: Joi.string().valid(UserTypeCode.MEMBER, UserTypeCode.SPONSOR),
  }),
};
