import { RoleRequest } from "app-request";
import _ from "lodash";
import crypto from "crypto";
import { SuccessResponse } from "../../core/ApiResponse";
import { RoleCode } from "../../database/model/Role";
import UserRepo from "../../database/repository/UserRepo";
import { BadRequestError } from "../../core/ApiError";
import asyncHandler from "../../helpers/asyncHandler";
import { sendEmail } from "../../helpers/emails";
import RoleRepo from "../../database/repository/RoleRepo";
import UserTypeRepo from "../../database/repository/UserTypeRepo";
import { UserTypeCode } from "../../database/model/UserType";

export const signup = asyncHandler(async (req: RoleRequest, res) => {
  const {
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    userType,
    country,
    birthDay,
    message,
  } = req.body;
  if (req.file) req.body.profilePicUrl = req.file.path;
  let user = await UserRepo.findByEmail(email);
  if (user) throw new BadRequestError("User already registered");

  const roleUser = await RoleRepo.findByCode(RoleCode.USER);
  if (!roleUser) throw new BadRequestError("role not found");

  const userTypeCheck = await UserTypeRepo.getOneByObj({
    name: UserTypeCode.MEMBER,
  });
  if (!userTypeCheck) throw new BadRequestError("userType not found");

  const resetCode = crypto.randomInt(1111, 9999).toString();

  const createdUser = await UserRepo.create({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    userType: userTypeCheck,
    verified: true,
    role: roleUser._id,
    resetCode,
    birthDay,
    country,
    profilePicUrl: req.body.profilePicUrl,
  });

  await sendEmail({
    email: createdUser.email,
    subject: "تحقق من الحساب", // Arabic translation for 'verify account'
    message: message ? message : "",
    template: "emailConfirmationCode",
    variables: {
      code: resetCode,
    },
  });

  new SuccessResponse("Account created successfully", createdUser).send(res);
});
