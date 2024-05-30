import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import { SuccessMsgResponse } from '../../core/ApiResponse';
import UserTypeRepo from '../../database/repository/UserTypeRepo';

export const removeUserType = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const userType = await UserTypeRepo.remove(id);
    if (!userType) throw new BadRequestError('UserType not found');
    return new SuccessMsgResponse('UserType Deleted').send(res);
  }
);
