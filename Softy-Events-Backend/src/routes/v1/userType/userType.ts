import express from 'express';
import authentication from '../../../auth/authentication';
import userTypeController from '../../../controllers/userType';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';

const router = express.Router();

router.use(
  '/',
  authentication
  // , authorization([RoleCode.ADMIN])
);

router
  .route('/')
  .post(validator(schema.create), userTypeController.createUserType)
  .get(userTypeController.getAllUserTypes);

router
  .route('/:id')
  .get(
    validator(schema.param, ValidationSource.PARAM),
    userTypeController.getUserType
  )
  .put(
    validator(schema.param, ValidationSource.PARAM),
    validator(schema.update),
    userTypeController.updateUserType
  )
  .delete(
    validator(schema.param, ValidationSource.PARAM),
    userTypeController.removeUserType
  );
export default router;
