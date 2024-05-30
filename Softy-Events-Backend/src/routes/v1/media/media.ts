import express from 'express';
import validator, { ValidationSource } from '../../../helpers/validator';
import { uploadFileSchema } from './schema';
import mediaController from '../../../controllers/media';
import FileUploadHandler from '../../../helpers/fileUpload';

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();

router.post(
  '/upload/one',
  validator(uploadFileSchema, ValidationSource.FILE),
  fileUploadHandler.handleSingleFileUpload('file'),
  mediaController.uploadSingleFile,
);

router.post(
  '/upload',
  validator(uploadFileSchema, ValidationSource.FILE),
  fileUploadHandler.handleFileUpload,
);
router.post(
  '/upload/:mediaFolderName',
  validator(uploadFileSchema, ValidationSource.FILE),
  fileUploadHandler.handleFileUpload,
);

export default router;
