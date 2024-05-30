import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';
import {
  SuccessResponse,
  SuccessResponsePaginate,
} from '../../core/ApiResponse';
import AdminRepo from '../../database/repository/AdminRepo';

export const getAllAdmins = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, perPage, deleted } = req.query;
  const options = {
    page: parseInt(page as string, 10) || 1,
    limit: parseInt(perPage as string, 10) || 10,
  };

  const users = await AdminRepo.findAll(options, req.query);
  const { docs, ...meta } = users;
  const filteredDocs = users.docs.filter((el) => el.token !== undefined);
  new SuccessResponsePaginate(
    'All admins returned successfuly',
    filteredDocs,
    meta
  ).send(res);
});
