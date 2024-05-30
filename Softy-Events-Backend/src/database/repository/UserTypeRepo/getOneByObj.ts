import UserType, { UserTypeModel } from '../../model/UserType';

const findByObj = (obj: object): Promise<UserType | null> => {
  return UserTypeModel.findOne(obj).exec();
};

export default findByObj;
