import { seedRoles } from './roles';
import { seedUser } from './user';
import { RoleCode } from '../../database/model/Role';
import { seeder } from '../../config/envVar';
import { environment } from '../../config/envVar';
import { seedDelete } from './drop';
import '../../database';
import { seedCountries } from './countries';
import { seedUserTypes } from './userTypes';

export let seed = async (args = { clearDatabase: false }) => {
  await seedDelete();
  await seedRoles([RoleCode.ADMIN, RoleCode.USER]);
  await seedUser(
    RoleCode.ADMIN,
    seeder.adminEmail,
    seeder.adminName,
    seeder.adminPass
  );
  await seedUserTypes();
  await seedCountries();
  environment !== 'test' && process.exit(1);
};

seed({ clearDatabase: environment === 'test' });
