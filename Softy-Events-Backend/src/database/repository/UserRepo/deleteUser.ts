import User, { UserModel } from '../../model/User';

const deleteUser = async (user: User): Promise<any> => {
  let email = user.email as string;
  let regex = '^old[0-9]+' + email;
  const deletedUsers = await UserModel.count({ email: { $regex: regex } });
  return UserModel.findByIdAndUpdate(
    user._id,
    { $set: { email: `old${deletedUsers}${email}`, deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default deleteUser;
