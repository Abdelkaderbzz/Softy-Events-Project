import User, { UserModel } from '../../model/User';

const updateInfo = (user: User): Promise<any> => {
  return UserModel.updateOne({ _id: user._id }, { $set: { ...user } }).exec();
};

export default updateInfo;
