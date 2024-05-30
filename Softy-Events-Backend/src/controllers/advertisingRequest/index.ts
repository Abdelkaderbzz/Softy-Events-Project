import asyncHandler from "../../helpers/asyncHandler";
import { ProtectedRequest } from "app-request";
import { BadRequestError } from "../../core/ApiError";
import {
  SuccessResponse,
  SuccessResponsePaginate,
} from "../../core/ApiResponse";
import advertisingRequestRepository from "../../database/repository/AdvertisingRequestRepo";

export const createAdvertiseRequest = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const created = await advertisingRequestRepository.create(req.body);
    return new SuccessResponse("success", created).send(res);
  }
);
export const updateAdvertiseRequest = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const advReq = await advertisingRequestRepository.findById(id);
    if (!advReq) throw new BadRequestError("advertise request not found");
    const updated = await advertisingRequestRepository.updateById(id, req.body);

    return new SuccessResponse("success", updated).send(res);
  }
);
export const deleteAdvertiseRequest = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const advReq = await advertisingRequestRepository.findById(id);
    if (!advReq) throw new BadRequestError("advertise request not found");
    const deleted = await advertisingRequestRepository.deleteById(id);
    return new SuccessResponse("success", deleted).send(res);
  }
);
export const getAdvertiseRequest = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { id } = req.params;
    const advReq = await advertisingRequestRepository.findById(id);
    if (!advReq) throw new BadRequestError("advertise request not found");
    return new SuccessResponse("success", advReq).send(res);
  }
);

export const getAllAdvertiseRequests = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { page, limit, deleted } = req.query;
    const options = {
      page: Number(page) || 1,
      limit: Number(limit) || 12,
    };
    console.log({ options });
    const users = await advertisingRequestRepository.findAll(
      options,
      req.query,
      {
        isPaging: true,
        deleted: Boolean(deleted),
      }
    );
    console.log({ users });
    const { docs, ...meta } = users;
    new SuccessResponsePaginate(
      "All advertiseRequests returned successfuly",
      docs,
      meta
    ).send(res);
  }
);

export default {
  createAdvertiseRequest,
  getAdvertiseRequest,
  updateAdvertiseRequest,
  deleteAdvertiseRequest,
  getAllAdvertiseRequests,
};
