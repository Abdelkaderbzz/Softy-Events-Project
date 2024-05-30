import { ProtectedRequest } from 'app-request';
import PostRepo from '../../database/repository/PostRepo';
import asyncHandler from '../../helpers/asyncHandler';
import { SuccessResponse } from '../../core/ApiResponse';
import { PostStatus } from '../../database/model/post';

export const createPost = asyncHandler(async (req: ProtectedRequest, res) => {
  const { user, body, file } = req;

  if (file) body.postPicUrl = file.path;
  body.status = PostStatus.PENDING;
  body.createdBy = user._id;
  const post = await PostRepo.create(body);
  return new SuccessResponse('post has been created successfully!', post).send(
    res
  );
});
