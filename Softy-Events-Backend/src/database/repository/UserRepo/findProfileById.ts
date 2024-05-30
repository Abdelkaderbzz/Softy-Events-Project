import User, { UserModel } from '../../model/User';
import { Types } from 'mongoose';

const findProfileById = (id: Types.ObjectId): Promise<User | null> => {
  return UserModel.findOne({ _id: id })
    .select('+name +lastname +role +email')
    .populate({
      path: 'role',
      select: { code: 1 },
    })
    .exec();
};

export default findProfileById;
