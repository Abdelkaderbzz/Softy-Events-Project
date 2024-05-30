import { UserModel } from '../../model/User';

const countAll = async (): Promise<number> => {
  return await UserModel.find({
    deletedAt: null,
  }).countDocuments();
};

export default countAll;
