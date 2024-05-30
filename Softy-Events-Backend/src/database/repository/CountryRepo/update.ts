import Country, { CountryModel } from '../../model/Country';

const update = async (
  id: string,
  obj: Partial<Country>
): Promise<Country | null> => {
  return await CountryModel.findByIdAndUpdate(
    id,
    { $set: { ...obj } },
    { new: true }
  ).exec();
};

export default update;
