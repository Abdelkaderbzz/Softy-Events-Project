import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserTypeRepo from '../../database/repository/UserTypeRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const createUserType = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { body } = req;
    const userType = await UserTypeRepo.create(body);
    new SuccessResponse(
      'UserType has been created successfully!',
      userType
    ).send(res);
  }
);
