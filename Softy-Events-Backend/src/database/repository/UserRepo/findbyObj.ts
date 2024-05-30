import User, { UserModel } from '../../model/User';

const findByObj = async (obj: object): Promise<User | null> => {
  return await UserModel.findOne(obj)
    .select('+role +email')
    .populate({
      path: 'role',
      select: { code: 1 },
    })
    .exec();
};

export default findByObj;
