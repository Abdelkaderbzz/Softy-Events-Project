import { ApiOptions } from "app-request";
import IAdvReq, {
  AdvertiseModel,
} from "../../../database/model/advertisingRequest";
import { PaginationModel } from "mongoose-paginate-ts";
import APIFeatures from "../../../helpers/apiFeatures";
import { findLast } from "lodash";

const create = async (data: Partial<IAdvReq>): Promise<IAdvReq> => {
  return await AdvertiseModel.create(data);
};

const findById = async (id: string): Promise<IAdvReq | null> => {
  return await AdvertiseModel.findById(id).exec();
};

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions
): Promise<PaginationModel<IAdvReq>> => {
  let findAllQuery = apiOptions.deleted
    ? AdvertiseModel.find({ deletedAt: { $ne: null } })
    : AdvertiseModel.find({ deletedAt: null });
console.log({findAllQuery})
  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search([]);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await AdvertiseModel.paginate(options)) as PaginationModel<IAdvReq>;
};

const updateById = async (
  id: string,
  updateData: Partial<IAdvReq>
): Promise<IAdvReq | null> => {
  return await AdvertiseModel.findByIdAndUpdate(id, updateData, {
    new: true,
  }).exec();
};

const deleteById = async (id: string): Promise<IAdvReq | null> => {
  return await AdvertiseModel.findByIdAndUpdate(
    id,
    { deletedAt: new Date() },
    { new: true }
  ).exec();
};

const advertisingRequestRepository = {
  create,
  findById,
  findAll,
  updateById,
  deleteById,
};

export default advertisingRequestRepository;
