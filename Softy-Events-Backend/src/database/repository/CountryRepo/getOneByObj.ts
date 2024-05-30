import Country, { CountryModel } from '../../model/Country';

const findByObj = (obj: object): Promise<Country | null> => {
  return CountryModel.findOne(obj).exec();
};

export default findByObj;
