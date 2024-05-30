import Admin, { AdminModel } from '../../model/Admin';
import { Types } from 'mongoose';

const findById = (id: Types.ObjectId): Promise<Admin | null> => {
  return AdminModel.findOne({ _id: id, status: true })
    .select('+email +role +_id')
    .populate({
      path: 'role',
      match: { status: true },
    })
    .exec();
};

export default findById;
