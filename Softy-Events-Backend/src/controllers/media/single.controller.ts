import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import _ from 'lodash';
import { SuccessResponse } from '../../core/ApiResponse';

const uploadSingleFile = asyncHandler(async (req: ProtectedRequest, res) => {
  const uploaded = req.file || undefined;
  return new SuccessResponse('success', _.pick(uploaded, ['filename', 'path', 'size'])).send(res);
});

export default uploadSingleFile;
