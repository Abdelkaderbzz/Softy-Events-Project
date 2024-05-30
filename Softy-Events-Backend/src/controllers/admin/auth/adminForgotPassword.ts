import { ProtectedRequest } from 'app-request';
import crypto from 'crypto';
import { SuccessMsgResponse } from '../../../core/ApiResponse';
import { BadRequestError } from '../../../core/ApiError';
import asyncHandler from '../../../helpers/asyncHandler';
import { sendEmail } from '../../../helpers/emails';
import AdminRepo from '../../../database/repository/AdminRepo';

export const adminForgotPassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const email = req.body.email;
    let user = await AdminRepo.findByEmail(email);
    if (!user) throw new BadRequestError('Invalid email');
    const resetCode = crypto.randomInt(111111, 999999).toString();
    user.resetCode = resetCode;

    await user.save();

    sendEmail({
      email: user.email,
      subject: 'نسيت كلمة المرور',
      message: '',
      template: 'emailConfirmationCode',
      variables: {
        code: resetCode,
      },
    });

    new SuccessMsgResponse(
      'An email has been sent to recover your password'
    ).send(res);
  }
);
