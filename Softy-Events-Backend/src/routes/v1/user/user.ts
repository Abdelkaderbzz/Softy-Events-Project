import express from 'express';
import role from '../../../helpers/role';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import userController from '../../../controllers/user';
import validator, { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import uploadMediaFilesToThisFolder from '../../../helpers/fileUpload/uploadDestiny';
import FileUploadHandler from '../../../helpers/fileUpload/index';
import { mediaFodlerNameSchemaAndObjectId } from '../global.routes.schema';

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();

router.use('/', authentication, authorization([RoleCode.ADMIN]));

router.get('/all', userController.getAllUsers);
router.get('/all/non-admins', userController.getAllNonAdmins);
router.get('/all/count', userController.countAllUsers);
router.post(
  '/create',
  uploadMediaFilesToThisFolder('users'),
  fileUploadHandler.handleMultipleFileUpload(['profilePicUrl', 'brandPicUrl']),
  validator(schema.create),
  userController.createUser
);
router.get(
  '/:id',
  validator(schema.userId, ValidationSource.PARAM),
  userController.getUser
);
router.put(
  '/:id',
  uploadMediaFilesToThisFolder('users'),
  fileUploadHandler.handleMultipleFileUpload(['profilePicUrl', 'brandPicUrl']),
  validator(mediaFodlerNameSchemaAndObjectId, ValidationSource.PARAM),
  validator(schema.update),
  userController.updateUser
);


router.delete(
  '/:id',
  validator(schema.userId, ValidationSource.PARAM),
  userController.deleteUser
);
export default router;
