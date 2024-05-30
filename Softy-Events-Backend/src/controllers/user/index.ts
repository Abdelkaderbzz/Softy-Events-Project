import { createUser } from './createUser.controller';
import { deleteUser } from './deleteUser.controller';
import { getUser } from './getUser.controller';
import { updateUser } from './updateUser.controller';
import { getAllUsers } from './getAllUsers.controller';
import countAllUsers from './countAll.controller';
import { getAllNonAdmins } from './getAllNonAdmins.controller';

export default {
  createUser,
  deleteUser,
  getUser,
  updateUser,
  getAllUsers,
  countAllUsers,
  getAllNonAdmins,
};
