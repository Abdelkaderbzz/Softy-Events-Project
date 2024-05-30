import { SuccessResponse } from '../../core/ApiResponse';
import { NotFoundError } from '../../core/ApiError';
import { Types } from 'mongoose';
import { ProtectedRequest } from 'app-request';
import asyncHandler from '../../helpers/asyncHandler';
import PostRepo from '../../database/repository/PostRepo';

export const getPost = asyncHandler(async (req: ProtectedRequest, res) => {
  const postId = new Types.ObjectId(req.params.postId);
  const post = await PostRepo.findOne({ _id: postId });
  if (!post) throw new NotFoundError('Post not found');
  return new SuccessResponse('Post returned successfully', post).send(res);
});
