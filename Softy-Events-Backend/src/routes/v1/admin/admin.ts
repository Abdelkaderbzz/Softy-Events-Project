import express from "express";
import authentication from "../../../auth/authentication";
import authorization from "../../../auth/authorization";
import { RoleCode } from "../../../database/model/Role";
import adminController from "../../../controllers/admin";
import validator, { ValidationSource } from "../../../helpers/validator";
import schema from "./schema";
import uploadMediaFilesToThisFolder from "../../../helpers/fileUpload/uploadDestiny";
import FileUploadHandler from "../../../helpers/fileUpload/index";

const router = express.Router();
const fileUploadHandler = new FileUploadHandler();

router.use("/", authentication, authorization([RoleCode.ADMIN]));

router.get("/", adminController.getAllAdmins);
router.get("/all", adminController.getAllNonAdmins);
router.get("/all/count", adminController.countaAllAdmins);
router.get("/me", adminController.getMyProfile);

router.get(
  "/:id",
  validator(schema.userId, ValidationSource.PARAM),
  adminController.getAdmin
);
router.put(
  "/:id",
  uploadMediaFilesToThisFolder("admins"),
  fileUploadHandler.handleSingleFileUpload("profilePicUrl"),
  validator(schema.userId, ValidationSource.PARAM),
  validator(schema.update),
  adminController.updateAdmin
);
router.post(
  "/",
  uploadMediaFilesToThisFolder("admins"),
  fileUploadHandler.handleSingleFileUpload("profilePicUrl"),
  validator(schema.create),
  adminController.createAdmin
);

router.delete(
  "/:id",
  authorization([RoleCode.ADMIN]),
  validator(schema.userId, ValidationSource.PARAM),
  adminController.deleteAdmin
);

export default router;
