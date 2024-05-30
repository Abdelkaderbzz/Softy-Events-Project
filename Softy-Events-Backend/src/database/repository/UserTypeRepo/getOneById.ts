import UserType, { UserTypeModel } from '../../model/UserType';

const findById = (id: string): Promise<UserType | null> => {
  return UserTypeModel.findById(id).exec();
};

export default findById;
