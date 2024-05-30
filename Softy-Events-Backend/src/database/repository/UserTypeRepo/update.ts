import UserType, { UserTypeModel } from '../../model/UserType';

const update = async (
  id: string,
  obj: Partial<UserType>
): Promise<UserType | null> => {
  return await UserTypeModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  ).exec();
};

export default update;
