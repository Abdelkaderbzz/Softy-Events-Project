import Admin, { AdminModel } from '../../model/Admin';

const update = async (
  id: string,
  obj: Partial<Admin>
): Promise<Admin | null> => {
  return await AdminModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true, runValidators: true, context: 'query' }
  ).exec();
};

export default update;
