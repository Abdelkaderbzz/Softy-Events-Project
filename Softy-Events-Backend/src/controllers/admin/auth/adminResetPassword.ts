import { ProtectedRequest } from 'app-request';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import asyncHandler from '../../../helpers/asyncHandler';
import AdminRepo from '../../../database/repository/AdminRepo';

export const adminResetPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const token = req.params.token;
    const newPassword = req.body.newPassword;
    let user = await AdminRepo.findByObj({ resetCode: token });
    if (!user) throw new BadRequestError('Invalid confirmation token');

    user.password = newPassword;
    user.resetCode = null;

    await user.save();

    return new SuccessMsgResponse('password have been updated').send(res);
  }
);
