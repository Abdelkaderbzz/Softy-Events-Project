import User, { UserModel } from '../../model/User';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';
import { Types } from 'mongoose';
import { RoleModel } from '../../model/Role';

type pagingObj = {
  limit: number;
  page: number;
};

const getAllNonAdmins = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions,
): Promise<PaginationModel<User>> => {
  const userRoleId = (await RoleModel.findOne({ code: 'USER' }).select('_id'))?._id;

  let findAllQuery = apiOptions.deleted
    ? UserModel.find({
        deletedAt: { $ne: null },
        role: [userRoleId],
      })
    : UserModel.find({
        deletedAt: null,
        role: [userRoleId],
      });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['name', 'email']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await UserModel.paginate(options)) as PaginationModel<User>;
};

export default getAllNonAdmins;
