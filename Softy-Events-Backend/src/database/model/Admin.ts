import { model, Schema, Document } from "mongoose";
import Role from "./Role";
import { mongoosePagination, Pagination } from "mongoose-paginate-ts";
import bcrypt from "bcryptjs";
import { preFindHook } from "../../helpers/databaseHooks";
import Country from "./Country";
import { Gender } from "./User";
import IUserType from "./UserType";

export const DOCUMENT_NAME = "Admin";
export const COLLECTION_NAME = "admins";

export default interface Admin extends Document {
  firstName?: string;
  lastName?: string;
  email: string;
  phoneNumber: string;
  password: string;
  userType?: IUserType;
  country: Country;
  profilePicUrl?: string;
  birthDay: Date;
  gender: Gender;
  role: Role;
  verified?: boolean;
  token: string | null;
  resetCode?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

const schema = new Schema(
  {
    firstName: {
      type: Schema.Types.String,
      trim: true,
    },
    lastName: {
      type: Schema.Types.String,
      trim: true,
    },
    email: {
      type: Schema.Types.String,
      trim: true,
    },
    phoneNumber: {
      type: Schema.Types.String,
      trim: true,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    gender: {
      type: Schema.Types.String,
    },
    userType: {
      type: Schema.Types.ObjectId,
      ref: "UserType",
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: "Country",
    },
    profilePicUrl: {
      type: Schema.Types.String,
    },
    birthDay: {
      type: Schema.Types.Date,
    },
    role: {
      type: Schema.Types.ObjectId,
      ref: "Role",
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
    },
    token: {
      type: Schema.Types.String,
      nullable: true,
      select: false,
    },
    resetCode: {
      type: Schema.Types.String,
      nullable: true,
      select: false,
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

schema.plugin(mongoosePagination);
schema.pre("save", async function (this: Admin, next) {
  if (this.isModified("email")) this.email = this.email?.toLocaleLowerCase();

  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

schema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

export const AdminModel = model<Admin, Pagination<Admin>>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
