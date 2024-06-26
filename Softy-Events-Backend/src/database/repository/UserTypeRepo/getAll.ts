import UserType, { UserTypeModel } from '../../model/UserType';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object,
  apiOptions: ApiOptions
): Promise<PaginationModel<UserType>> => {
  let findAllQuery = apiOptions.deleted
    ? UserTypeModel.find({ deletedAt: { $ne: null } })
    : UserTypeModel.find({ deletedAt: null });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search(['name']);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await UserTypeModel.paginate(options)) as PaginationModel<UserType>;
};

export default findAll;
