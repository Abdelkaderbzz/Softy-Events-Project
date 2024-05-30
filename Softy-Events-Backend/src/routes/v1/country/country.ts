import express from 'express';
import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import authentication from '../../../auth/authentication';
import countryController from '../../../controllers/country';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';

const router = express.Router();

// router.use('/', authentication);

router.route('/').get(countryController.getAllCountries);

router
  .route('/:id')
  .get(
    validator(schema.param, ValidationSource.PARAM),
    countryController.getCountry
  );

export default router;
