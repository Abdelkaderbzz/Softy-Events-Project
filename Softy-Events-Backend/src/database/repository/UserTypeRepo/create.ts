import UserType, { UserTypeModel } from '../../model/UserType';

const create = async (obj: UserType): Promise<UserType> => {
  return await UserTypeModel.create(obj);
};

export default create;
