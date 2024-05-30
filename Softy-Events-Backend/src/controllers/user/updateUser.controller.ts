import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { Types } from 'mongoose';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponse } from '../../core/ApiResponse';
import User from '../../database/model/User';

export const updateUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = new Types.ObjectId(req.params.id);

  const user = await UserRepo.findByObj({
    _id: userId,
    deletedAt: null,
  });
  if (!user) throw new BadRequestError('User not registered or deleted');
  if (user === req.user)
    throw new BadRequestError('You cannot update yourself');

  // if (req.body.name) user.name = req.body.name;
  if (req.body.role) user.role = req.body.role;
  if (req.body.email) user.email = req.body.email;
  if (req.body.phoneNumber) user.phoneNumber = req.body.phoneNumber;
  // if (req.body.lastname) user.lastname = req.body.lastname;

  const profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any).profilePicUrl[0].path
    : '';
  const brandPicUrl = (req.files as any)?.brandPicUrl
    ? (req.files as any).brandPicUrl[0].path
    : '';

  if (profilePicUrl) user.profilePicUrl = profilePicUrl;
  // if (brandPicUrl) user.brandPicUrl = brandPicUrl;

  const { role, ...userToUpdate } = user;

  await UserRepo.updateInfo(userToUpdate as User);
  return new SuccessResponse('Profile updated', user).send(res);
});
