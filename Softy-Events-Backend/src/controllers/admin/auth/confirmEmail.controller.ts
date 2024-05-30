import _ from "lodash";
import crypto from "crypto";
import { SuccessMsgResponse } from "../../../core/ApiResponse";
import { BadRequestError } from "../../../core/ApiError";
import asyncHandler from "../../../helpers/asyncHandler";
import { sendEmail } from "../../../helpers/emails";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import AdminRepo from "../../../database/repository/AdminRepo";

export const confirmEmail = asyncHandler(async (req: any, res) => {
  const token = req.params.token;
  const user = await AdminRepo.findByObj({ token });
  if (!user) throw new BadRequestError("Invalid confirmation token");

  user.token = null;
  user.verified = true;

  const accessTokenKey = crypto.randomBytes(64).toString("hex");
  const refreshTokenKey = crypto.randomBytes(64).toString("hex");
  const keystore = await KeystoreRepo.create(
    user._id,
    accessTokenKey,
    refreshTokenKey
  );
  await AdminRepo.update(user, keystore?.primaryKey, keystore?.secondaryKey);

  sendEmail({
    email: user.email,
    subject: "تأكيد عنوان البريد الإلكتروني",
    message: `تم تأكيد عنوان بريدك الإلكتروني وحسابك الآن نشط.`,
    template: "accountVerified",
  });

  new SuccessMsgResponse("Email confirmed successfully").send(res);
});
