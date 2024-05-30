import { UserTypeModel } from './../../database/model/UserType';
import { UserTypeCode } from '../../database/model/UserType';

const userTypes = [
  { name: UserTypeCode.MEMBER },
  { name: UserTypeCode.SPONSOR },
];
export const seedUserTypes = async () => {
  try {
    await UserTypeModel.create(userTypes);

    console.info(`userTypes seeded`);
  } catch (err) {
    console.error('Error seeding userTypes:', err);
  }
};
