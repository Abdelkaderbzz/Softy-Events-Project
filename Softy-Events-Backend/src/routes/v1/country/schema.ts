import Joi from '@hapi/joi';
import { JoiObjectId } from '../../../helpers/validator';

export default {
  param: Joi.object().keys({
    id: JoiObjectId().required(),
  }),
};
