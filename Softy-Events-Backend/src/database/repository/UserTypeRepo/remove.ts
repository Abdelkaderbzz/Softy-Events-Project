import UserType, { UserTypeModel } from '../../model/UserType';

const remove = async (id: string): Promise<UserType | null> => {
  return await UserTypeModel.findByIdAndUpdate(
    id,
    { $set: { deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default remove;
