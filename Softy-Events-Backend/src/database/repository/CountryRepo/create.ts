import Country, { CountryModel } from '../../model/Country';

const create = async (obj: Country): Promise<Country> => {
  return await CountryModel.create(obj);
};

export default create;
