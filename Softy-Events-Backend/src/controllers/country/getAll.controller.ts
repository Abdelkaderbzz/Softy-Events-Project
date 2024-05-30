import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import CountryRepo from '../../database/repository/CountryRepo';
import { SuccessResponsePaginate } from '../../core/ApiResponse';

export const getAllCountries = asyncHandler(
  async (req: ProtectedRequest, res) => {
    const { page, perPage, deleted } = req.query;
    const options = {
      page: parseInt(page as string, 10) || 1,
      limit: parseInt(perPage as string, 10) || 10,
    };

    const countrys = await CountryRepo.getAll(options, req.query);

    const { docs, ...meta } = countrys;
    new SuccessResponsePaginate(
      'All users returned successfully',
      docs,
      meta
    ).send(res);
  }
);
