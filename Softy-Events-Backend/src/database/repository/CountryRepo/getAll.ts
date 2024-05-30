import Country, { CountryModel } from '../../model/Country';
import { PaginationModel } from 'mongoose-paginate-ts';
import APIFeatures from '../../../helpers/apiFeatures';

type pagingObj = {
  limit: number;
  page: number;
};

const findAll = async (
  paging: pagingObj,
  query: object
): Promise<PaginationModel<Country>> => {
  let findAllQuery = CountryModel.find({ deletedAt: null });

  const features = new APIFeatures(findAllQuery, query)
    .filter()
    .sort()
    .limitFields()
    .search([])

  const options = {
    query: features.query,
    limit: paging.limit ? paging.limit : null,
    page: paging.page ? paging.page : null,
  };

  return (await CountryModel.paginate(options)) as PaginationModel<Country>;
};

export default findAll;
