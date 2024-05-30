import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import UserTypeRepo from '../../database/repository/UserTypeRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getUserType = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const userType = await UserTypeRepo.getOneById(id);
  if (!userType) throw new BadRequestError('UserType not found');
  return new SuccessResponse('success', userType).send(res);
});
