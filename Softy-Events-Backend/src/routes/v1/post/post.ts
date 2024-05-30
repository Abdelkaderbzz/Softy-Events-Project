import express from 'express';
import authentication from '../../../auth/authentication';
import authorization from '../../../auth/authorization';
import { RoleCode } from '../../../database/model/Role';
import validator from '../../../helpers/validator';
import { ValidationSource } from '../../../helpers/validator';
import schema from './schema';
import post from '../../../controllers/post';
import FileUploadHandler from '../../../helpers/fileUpload';
import uploadMediaFilesToThisFolder from '../../../helpers/fileUpload/uploadDestiny';
const router = express.Router({
  mergeParams: true,
});
const fileUploadHandler = new FileUploadHandler();

router.use("/", authentication, authorization([RoleCode.ADMIN, RoleCode.USER]));

router.post(
  '/',
  uploadMediaFilesToThisFolder('posts'),
  fileUploadHandler.handleSingleFileUpload('postPicUrl'),
  validator(schema.create, ValidationSource.BODY),
  post.createPost
);

router.get("/", post.getAll);

router.get(
  "/:postId",
  validator(schema.postId, ValidationSource.PARAM),
  post.getPost
);

router.patch(
  '/:postId',
  uploadMediaFilesToThisFolder('posts'),
  fileUploadHandler.handleSingleFileUpload('postPicUrl'),
  validator(schema.postId, ValidationSource.PARAM),
  validator(schema.update, ValidationSource.BODY),
  post.UpdatePost
);

router.patch(
  '/:postId/status',
  validator(schema.postId, ValidationSource.PARAM),
  validator(schema.update, ValidationSource.BODY),
  post.UpdatePost
);

router.delete(
  "/:postId",
  validator(schema.postId, ValidationSource.PARAM),
  post.deletePost
);

export default router;
