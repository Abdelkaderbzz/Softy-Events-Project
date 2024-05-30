import { model, Schema, Document } from 'mongoose';
import { mongoosePagination, Pagination } from 'mongoose-paginate-ts';
import { preFindHook } from '../../helpers/databaseHooks';

export const DOCUMENT_NAME = 'Country';
export const COLLECTION_NAME = 'countries';

export default interface Country extends Document {
  name: string;
  tag: string;
  flag: string;
  idd: {
    root: string
    suffixes: string
  }
  deletedAt?: Date;
}

const schema = new Schema<Country>(
  {
    name: {
      type: Schema.Types.String,
      trim: true,
      unique: true,
    },
    tag: {
      type: Schema.Types.String,
      trim: true,
      unique: true,
    },
    flag: {
      type: Schema.Types.String,
      trim: true,
    },
    idd: {
      root: {
        type: Schema.Types.String,
        trim: true,
      },
      suffixes: {
        type: Schema.Types.String,
        trim: true,
      },
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

export const CountryModel = model<Country, Pagination<Country>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
