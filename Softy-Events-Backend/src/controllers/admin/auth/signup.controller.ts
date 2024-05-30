import { RoleRequest } from "app-request";
import _ from "lodash";
import { v4 as uuidv4 } from "uuid";
import { SuccessResponse } from "../../../core/ApiResponse";
import { RoleCode } from "../../../database/model/Role";
import { BadRequestError } from "../../../core/ApiError";
import asyncHandler from "../../../helpers/asyncHandler";
import { sendEmail } from "../../../helpers/emails";
import AdminRepo from "../../../database/repository/AdminRepo";
import Admin from "../../../database/model/Admin";

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const { name, email } = req.body;
  let profilePicUrl = (req.files as any)?.profilePicUrl
    ? (req.files as any)?.profilePicUrl[0].location
    : "";

  let user = await AdminRepo.findByEmail(email);
  if (user) throw new BadRequestError("User already registered");
  const generateSimplePassword = (length: number): string => {
    const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  };

  const password = generateSimplePassword(8);

  const confirmationToken = uuidv4();
  const confirmationLink = `${process.env.CLIENT_BASE_URL}/auth/admins/confirm/${confirmationToken}`;
  const createdUser = await AdminRepo.create(
    {
      name,
      email,
      password,
      profilePicUrl,
      token: confirmationToken,
    } as unknown as Admin,
    RoleCode.ADMIN
  );

  sendEmail({
    email: createdUser.email,
    subject: "تأكيد حسابك",
    message:
      "شكرًا لإنشاء حساب معنا. يرجى تأكيد حسابك عن طريق النقر على الرابط أدناه:",
    template: "adminEmailConfirmationLink",
    variables: {
      name: createdUser?.firstName,
      password: password,
      confirmationLink,
    },
  });

  new SuccessResponse(
    "The confirmation e-mail has been set, check your inbox or your spam folder !",
    {
      user: _.pick(createdUser, [
        "_id",
        "name",
        "email",
        "role",
        "profilePicUrl",
        "verified",
      ]),
    }
  ).send(res);
});
