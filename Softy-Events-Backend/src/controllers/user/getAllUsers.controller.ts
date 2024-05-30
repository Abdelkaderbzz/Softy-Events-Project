import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';

import UserRepo from '../../database/repository/UserRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllUsers = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, limit, deleted } = req.query;
  console.log({ limit });
  const options = {
    page,
    limit,
  };
  const users = await UserRepo.findAll(options, req.query, {});

  const { docs, ...meta } = users;
  new SuccessResponsePaginate(
    'All users returned successfuly',
    docs,
    meta
  ).send(res);
});
