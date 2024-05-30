import User, { UserModel } from '../../model/User';

const findByEmail = (email: string): Promise<User | null> => {
  return UserModel.findOne({ email: email })
    .select('+email +password +role +verified -status')
    .populate({
      path: 'role',
      select: { code: 1 },
    })
    .exec();
};

export default findByEmail;
