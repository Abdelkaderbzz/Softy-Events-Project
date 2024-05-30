import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { Types } from 'mongoose';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import KeystoreRepo from '../../database/repository/KeystoreRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const deleteUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);
  const user = await UserRepo.findByObj({
    _id: userId,
    deletedAt: null,
  });

  if (!user) throw new BadRequestError('User not registered or deleted');
  if (user?._id.toString() === req.user._id.toString())
    throw new BadRequestError('You cannot delete yourself');

  await KeystoreRepo.remove(user._id);
  let deletedUser = await UserRepo.deleteUser(user);
  return new SuccessResponse('User Deleted', deletedUser).send(res);
});
