import Country, { CountryModel } from '../../model/Country';

const findById = (id: string): Promise<Country | null> => {
  return CountryModel.findById(id).exec();
};

export default findById;
