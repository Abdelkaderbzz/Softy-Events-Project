import asyncHandler from '../../helpers/asyncHandler';
import { ProtectedRequest } from 'app-request';
import { BadRequestError } from '../../core/ApiError';
import CountryRepo from '../../database/repository/CountryRepo';
import { SuccessResponse } from '../../core/ApiResponse';

export const getCountry = asyncHandler(async (req: ProtectedRequest, res) => {
  const { id } = req.params;
  const country = await CountryRepo.getOneById(id);
  if (!country) throw new BadRequestError('Country not found');
  return new SuccessResponse('success', country).send(res);
});
