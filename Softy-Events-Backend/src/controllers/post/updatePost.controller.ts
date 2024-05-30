import { ProtectedRequest } from 'app-request';
import { Types } from 'mongoose';
import { NotFoundError } from '../../core/ApiError';
import { SuccessResponse } from '../../core/ApiResponse';
import PostRepo from '../../database/repository/PostRepo';
import asyncHandler from '../../helpers/asyncHandler';

export const UpdatePost = asyncHandler(async (req: ProtectedRequest, res) => {
  const { params, body, file } = req;
  const post = await PostRepo.findOne({ _id: params.postId });
  if (!post) new NotFoundError('Post not found ');
  if (file) body.postPicUrl = file.path;

  const report = await PostRepo.updateOne(
    {
      _id: params.postId,
    },
    body
  );

  new SuccessResponse('Post updated successfully', report).send(res);
});
