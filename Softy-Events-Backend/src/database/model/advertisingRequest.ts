import { Schema, model, Document, Types } from "mongoose";
import User from "./User";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import { preFindHook } from "../../helpers/databaseHooks";
import IPost from "./post";

export const DOCUMENT_NAME = "AdvertisingRequest";
export const COLLECTION_NAME = "advertisingRequests";

export enum advStatus {
  PENDING = "PENDING",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export default interface IAdvReq extends Document {
  sponsor: User | Types.ObjectId;
  product: IPost | Types.ObjectId;
  description: string;
  status: advStatus;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const schema = new Schema<IAdvReq>(
  {
    sponsor: {
      ref: "User",
      type: Types.ObjectId,
    },
    description: {
      type: String,
    },
    product: {
      ref: "post",
      type: Types.ObjectId,
    },
    status: {
      type: String,
      enum: advStatus,
    },
    deletedAt: {
      type: Date,
      default: null,
      select: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);
schema.plugin(mongoosePagination);
preFindHook(schema, ["sponsor product"]);

export const AdvertiseModel = model<IAdvReq, Pagination<IAdvReq>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
