import Country, { CountryModel } from '../../model/Country';

const remove = async (id: string): Promise<Country | null> => {
  return await CountryModel.findByIdAndUpdate(
    id,
    { $set: { deletedAt: Date.now() } },
    { new: true }
  ).exec();
};

export default remove;
