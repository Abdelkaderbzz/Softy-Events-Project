import { Schema, model, Document } from 'mongoose';
import User from './User';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'Post';
export const COLLECTION_NAME = 'posts';

export enum PostType {
  NEWS = 'NEWS',
  EVENT = 'EVENT',
  ARTICLE = 'ARTICLE',
}
export enum PostStatus {
  ACCEPTED = 'ACCEPTED',
  PENDING = 'PENDING',
  REJECTED = 'REJECTED',
}

export default interface IPost extends Document {
  createdBy: User;
  title: string;
  content: string;
  postPicUrl: string;
  postType: PostType;
  status: PostStatus;
  date: Date;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const schema = new Schema<IPost>(
  {
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    title: {
      type: Schema.Types.String,
    },
    content: {
      type: Schema.Types.String,
    },
    postPicUrl: {
      type: Schema.Types.String,
    },
    postType: {
      type: Schema.Types.String,
      trim: true,
      enum: PostType,
    },
    date:{
      type: Schema.Types.Date,
      required:true
    },
    status: {
      type: Schema.Types.String,
      trim: true,
      enum: PostStatus,
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
preFindHook(schema, ['createdBy']);

export const PostModel = model<IPost, Pagination<IPost>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
