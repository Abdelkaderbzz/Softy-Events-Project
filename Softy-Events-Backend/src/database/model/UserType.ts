import { model, Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'UserType';
export const COLLECTION_NAME = 'userTypes';

export const enum UserTypeCode {
  MEMBER = 'MEMBER',
  SPONSOR = 'SPONSOR',
}

export default interface IUserType extends Document {
  name: string;
  deletedAt?: Date;
}

const schema = new Schema<IUserType>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      unique: true,
      enum: [UserTypeCode.MEMBER, UserTypeCode.SPONSOR],
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
preFindHook(schema);
schema.plugin(mongoosePagination);

export const UserTypeModel = model<IUserType, Pagination<IUserType>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
