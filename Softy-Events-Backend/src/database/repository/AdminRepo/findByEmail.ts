import Admin, { AdminModel } from '../../model/Admin';

const findByEmail = async (email: string): Promise<Admin | null> => {
  return await AdminModel.findOne({ email: email, status: true })
    .select('+email +role +password +verified ')
    .populate({
      path: 'role',
      match: { status: true },
      select: { code: 1 },
    })
    .exec();
};
export default findByEmail;
