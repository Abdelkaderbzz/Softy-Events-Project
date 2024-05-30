import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import PostRepo from '../../database/repository/PostRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAll = asyncHandler(async (req: ProtectedRequest, res) => {
  const { page, limit, deleted } = req.query;
  const options = {
    page: Number(page) || 1,
    limit: Number(limit)  || 10,
  }; 

  const posts = await PostRepo.findAll(options, req.query, {
    isPaging: true,
    deleted: deleted == 'true',
  });
  const { docs, ...meta } = posts;
  new SuccessResponsePaginate(
    'All posts returned successfully',
    docs,
    meta
  ).send(res);
});
