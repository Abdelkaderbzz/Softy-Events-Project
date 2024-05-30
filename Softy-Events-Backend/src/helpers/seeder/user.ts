import { v4 as uuidv4 } from 'uuid';

import { RoleCode } from '../../database/model/Role';
import { UserModel } from '../../database/model/User';
import { RoleModel } from '../../database/model/Role';
import User from '../../database/model/User';
import { EMOJIS } from '../../constants/emojis';

export const seedUser = async (
  roleCode: RoleCode,
  email: string,
  name: string,
  password: string
) => {
  let roleAdmin = await RoleModel.findOne({ code: roleCode });

  if (roleAdmin) {
    let user = await UserModel.find({
      roles: roleAdmin._id,
      deletedAt: null,
    }).countDocuments();

    if (user > 0) {
      console.log(`${roleCode} user exist`);
    } else {
      try {
        let user = {
          role: roleAdmin,
          verified: true,
          firstName: name,
          lastName: name,
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        await UserModel.create(user as any);

        console.log(`${roleCode} user created successfully ` + EMOJIS.SUCCESS);
      } catch (error) {
        console.log('error : ', error);
      }
    }
  } else {
    console.log('Role user inexistant !');
  }
};
