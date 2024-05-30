import Admin, { AdminModel } from '../../model/Admin';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object
): Promise<PaginationModel<Admin>> => {
  let findAllQuery = AdminModel.find({ deletedAt: null });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .search([
      'firstName',
      'lastName',
      'name',
      'phoneNumber',
      'email',
    ]);

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };
  const ape = (await AdminModel.paginate(options)) as PaginationModel<Admin>;

  return ape;
};

export default findAll;
