import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import UserTypeRepo from '../../database/repository/UserTypeRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllUserTypes = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { page, perPage, deleted } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(perPage as string, 12) || 12,
    };

    const userTypes = await UserTypeRepo.getAll(options, req.query, {
      isPaging: true,
      deleted: deleted == 'true' ? true : false,
    });

    const { docs, ...meta } = userTypes;
    new SuccessResponsePaginate(
      'All users returned successfuly',
      docs,
      meta
    ).send(res);
  }
);
