import User, { UserModel } from "../../model/User";

const create = async (obj: any): Promise<User> => {
  return (await UserModel.create(obj)).populate([
    "userType",
    "country",
    "role",
  ]);
};

export default create;
