import { SuccessResponse } from '../../core/ApiResponse';
import { Types } from 'mongoose';
import { ProtectedRequest } from 'app-request';
import asyncHandler from '../../helpers/asyncHandler';
import { NotFoundError } from '../../core/ApiError';
import PostRepo from '../../database/repository/PostRepo';

export const deletePost = asyncHandler(async (req: ProtectedRequest, res) => {
  const postId = new Types.ObjectId(req.params.postId);

  let post = await PostRepo.findOne({ _id: postId });
  if (!post) throw new NotFoundError('Post not found');

  post = await PostRepo.deleteOne({ _id: postId });
  if (!post) throw new NotFoundError('Post not found ');
  return new SuccessResponse('Post deleted successfully', post).send(res);
});
