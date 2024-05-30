import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';

import { SuccessResponse } from '../../core/ApiResponse';
import UserRepo from '../../database/repository/UserRepo';

const countAllUsers = asyncHandler(async (req: ProtectedRequest, res) => {
  const count = await UserRepo.countAll();
  return new SuccessResponse('success', {
    users: count,
  }).send(res);
});

export default countAllUsers;
