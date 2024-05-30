import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import UserRepo from "../../database/repository/UserRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import RoleRepo from "../../database/repository/RoleRepo";
import { RoleCode } from "../../database/model/Role";
import { BadRequestError } from "../../core/ApiError";
import UserTypeRepo from "../../database/repository/UserTypeRepo";

export const createUser = asyncHandler(async (req: ProtectedRequest, res) => {
  const { body } = req;
console.log(body)
  let user = await UserRepo.findByObj(
    body.email ? { email: body.email } : { phoneNumber: body.phoneNumber }
  );
  if (user) throw new BadRequestError("User already registered");

  const roleUser = await RoleRepo.findByCode(RoleCode.USER);
  if (!roleUser) throw new BadRequestError("role not found");

  // const userType = await UserTypeRepo.getOneById(body.userType);
  // if (!userType) throw new BadRequestError("user type doesn't exist");
  user = await UserRepo.create({
    ...body,
    role: roleUser,
    verified: true,
    documentVerified: true,
  });
  if (!user)
    throw new BadRequestError("user with this credentials already exists");
  new SuccessResponse("User has been created successfully!", user).send(res);
});
