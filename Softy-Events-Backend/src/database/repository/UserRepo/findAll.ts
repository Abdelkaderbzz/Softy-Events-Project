import User, { UserModel } from '../../model/User';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';
import { ApiOptions } from 'app-request';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: any,
  query: object,
  apiOptions: ApiOptions
): Promise<PaginationModel<User>> => {
  let findAllQuery = apiOptions.deleted
    ? UserModel.find({ deletedAt: { $ne: null } })
    : UserModel.find({ deletedAt: null });

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
  console.log({ options });
  return (await UserModel.paginate(options)) as PaginationModel<User>;
};

export default findAll;
