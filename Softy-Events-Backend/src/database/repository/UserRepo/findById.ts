import User, { UserModel } from '../../model/User';
import { Types } from 'mongoose';

const findById = (id: Types.ObjectId): Promise<User | null> => {
  return UserModel.findOne({ _id: id })
    .select('+email +password +role +_id')
    .populate({
      path: 'role',
    })
    .exec();
};

export default findById;
