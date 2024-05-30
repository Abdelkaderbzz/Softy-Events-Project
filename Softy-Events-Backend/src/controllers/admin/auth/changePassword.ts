import { ProtectedRequest, RoleRequest } from "app-request";
import _ from "lodash";
import bcrypt from "bcryptjs";
import { SuccessResponse } from "../../../core/ApiResponse";
import { AuthFailureError } from "../../../core/ApiError";
import asyncHandler from "../../../helpers/asyncHandler";
import bcryptjs from "bcryptjs";
import AdminRepo from "../../../database/repository/AdminRepo";

export const adminChangePassword = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { oldPassword, newPassword } = req.body;

    const user = await AdminRepo.findById(req.user._id);
    if (!user) throw new AuthFailureError("User not found");

    const match = await bcryptjs.compare(oldPassword, user.password);
    
    if (!match) throw new AuthFailureError("Wrong old password");

   
    user.password = newPassword;
    await user.save();

    new SuccessResponse("Password changed successfully ", {}).send(res);
  }
);
