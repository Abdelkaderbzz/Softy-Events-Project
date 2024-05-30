import Admin, { AdminModel } from '../../model/Admin';


const findByObj = (obj: object): Promise<Admin | null> => {
  return AdminModel.findOne(obj)
    .select('+role +email')
    .populate({
      path: 'role',
      match: { status: true },
      select: { code: 1 },
    })
    .exec();
};

export default findByObj;
