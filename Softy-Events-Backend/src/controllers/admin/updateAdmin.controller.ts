import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import _ from "lodash";

import AdminRepo from "../../database/repository/AdminRepo";
import { SuccessResponse } from "../../core/ApiResponse";
import { RoleCode } from "../../database/model/Role";

export const updateAdmin = asyncHandler(async (req: ProtectedRequest, res) => {
  const userId = req.params.id;
  const { body } = req;
  if (
    req.params.id.toString() !== req.user._id.toString() &&
    req.user.role.code !== RoleCode.ADMIN
  ) {
    throw new BadRequestError("you can only update yourself");
  }
  const user = await AdminRepo.findByObj({
    _id: userId,
    status: true,
    deletedAt: null,
  });
  if (!user) throw new BadRequestError("Admin not registered or deleted");
  if (user._id.toString() !== req.user._id.toString()) {
    if (req.user.role.code === RoleCode.ADMIN) {
      throw new BadRequestError("Admins can only update their own profile");
    }
  }

  if (req.file) body.profilePicUrl = req.file.path;
  const updatedAdmin = await AdminRepo.updateInfo(userId, body);
  return new SuccessResponse("Profile updated", updatedAdmin).send(res);
});
