import { ProtectedRequest } from "app-request";
import crypto from "crypto";
import { SuccessResponse } from "../../core/ApiResponse";
import UserRepo from "../../database/repository/UserRepo";
import { BadRequestError } from "../../core/ApiError";
import asyncHandler from "../../helpers/asyncHandler";
import { sendEmail } from "../../helpers/emails";
import KeystoreRepo from "../../database/repository/KeystoreRepo";
import { createTokens } from "../../auth/authUtils";

export const confirmEmail = asyncHandler(async (req: ProtectedRequest, res) => {
  const code = req.body.code;
  const user = await UserRepo.findByObj({
    email: req.body.email,
    resetCode: code,
  });

  if (!user) throw new BadRequestError("Invalid confirmation code");
  user.resetCode = null;
  user.verified = true;

  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");
  const keystore = await KeystoreRepo.create(
    user._id,
    accessTokenKey,
    refreshTokenKey
  );
  await UserRepo.oldUpdate(user, keystore?.primaryKey, keystore?.secondaryKey);

  req.user = user;
  const [tokens] = await Promise.all([
    createTokens(user, accessTokenKey, refreshTokenKey),
    user,
  ]);

  sendEmail({
    email: user.email,
    subject: "تأكيد عنوان البريد الإلكتروني",
    message: "تم تأكيد عنوان بريدك الإلكتروني وتفعيل حسابك الآن.",
    template: "accountVerified",
  });

  new SuccessResponse("Email confirmed successfully", {
    tokens: tokens,
  }).send(res);
});
