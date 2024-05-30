import express from "express";
import authentication from "../../../auth/authentication";
import authorization from "../../../auth/authorization";
import { RoleCode } from "../../../database/model/Role";
import validator from "../../../helpers/validator";
import { ValidationSource } from "../../../helpers/validator";
import schema from "./schema";
import advertisingRequest from "../../../controllers/advertisingRequest";

const router = express.Router();

router.use("/", authentication, authorization([RoleCode.ADMIN, RoleCode.USER]));

router.post(
  "/",
  validator(schema.create, ValidationSource.BODY),
  advertisingRequest.createAdvertiseRequest
);

router.get("/", advertisingRequest.getAllAdvertiseRequests);

router.get(
  "/:id",
  validator(schema.requestId, ValidationSource.PARAM),
  advertisingRequest.getAdvertiseRequest
);

router.patch(
  "/:id",
  validator(schema.requestId, ValidationSource.PARAM),
  validator(schema.update, ValidationSource.BODY),
  advertisingRequest.updateAdvertiseRequest
);

router.delete(
  "/:id",
  validator(schema.requestId, ValidationSource.PARAM),
  advertisingRequest.deleteAdvertiseRequest
);

export default router;
