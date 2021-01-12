import { model, Schema, Document } from "mongoose";
import isEmail from "validator/lib/isEmail";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  nameMongooseValidation,
  emailMongooseValidation,
  passwordConfirmMongooseValidation,
  passwordMongooseValidation,
  roleMongooseValidation,
} from "./User.validators";

export interface IUserResponseToClient {
  name: string;
  role: string;
}

export interface IUserModel extends IUserResponseToClient, Document {
  email: string;
  password: string;
  passwordConfirm: string;

  passwordChangedAt?: string;
  passwordResetToken?: string;
  passwordResetExpires?: string;
  active?: boolean;

  correctPassword(
    candidatePassword: string,
    userPassword: string
  ): Promise<boolean>;

  changedPasswordAfter(jwtTimestamp: string): boolean;

  createPasswordResetToken(): string;
}

export const UserSchema = new Schema({
  name: {
    type: String,
    ...nameMongooseValidation,
  },
  //UNIQUE IS NOT VALIDATOR - WE MUST CATCH 11000 - DUPLICATE KEY ERROR
  email: {
    type: String,
    unique: true,
    lowercase: true,
    ...emailMongooseValidation,
  },
  role: {
    type: String,
    trim: true,
    default: "user",
    ...roleMongooseValidation,
  },
  password: {
    type: String,
    select: false,
    ...passwordMongooseValidation,
  },
  passwordConfirm: {
    type: String,
    select: false,
    ...passwordConfirmMongooseValidation,
  },
  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

/* userSchema.pre(/^find/, function(next) {
  //this points to query
  this.find({ active: { $ne: false } });
  next();
}); */

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  (this as IUserModel).password = await bcrypt.hash(
    (this as IUserModel).password,
    12
  );
  (this as IUserModel).passwordConfirm = "";
  next();
});
UserSchema.pre("save", function (next) {
  if (!this.isModified("password") || this.isNew) return next();
  (this as IUserModel).passwordChangedAt = (Date.now() - 1000).toString();
  next();
});

UserSchema.methods.correctPassword = async function (
  candidatePassword: string,
  userPassword: string
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

UserSchema.methods.changedPasswordAfter = function (jwtTimestamp: number) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      (this.passwordChangedAt.getTime() / 1000).toString(),
      10
    );
    return jwtTimestamp < changedTimestamp;
  }
  return false;
};

UserSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex");

  this.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
};

const UserModel = model<IUserModel>("User", UserSchema);

export default UserModel;
