import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import UserTypeRepo from '../../database/repository/UserTypeRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const updateUserType = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { body } = req;
    const { id } = req.params;

    const userType = await UserTypeRepo.update(id, body);
    if (!userType) throw new BadRequestError('userType not found');
    return new SuccessResponse('UserType updated', userType).send(res);
  }
);
