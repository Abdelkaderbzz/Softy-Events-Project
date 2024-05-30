import axios from 'axios';
import { CountryModel } from '../../database/model/Country';

export const seedCountries = async () => {
  try {
    const response = await axios({
      method: 'get',
      url: `https://restcountries.com/v3.1/all`,
    });

    const countriesArray = response.data
      .map((country: any) => {
        if (country.idd?.suffixes && country.name?.common) {
          return {
            name: country.name.common,
            tag: country.cca3,
            flag: country.flags.png,
            idd: {
              root: country.idd.root,
              suffixes: country.idd.suffixes[0],
            },
          };
        }
        return null;
      })
      .filter((country: any) => country !== null);

    await CountryModel.create(countriesArray);

    console.info('countries seeded');
  } catch (err) {
    console.error('Error seeding countries:', err);
  }
};
