import mongoose, { Schema, Document, Types } from "mongoose";

export enum UserRole {
  ADMIN = "ADMIN",
  ANALYST = "ANALYST",
  VIEWER = "VIEWER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
}

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role: UserRole;
    status: UserStatus;
    companyId: Types.ObjectId;
}

// Multi-tenant system model 

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
      select: false
    },

    role: {
      type: String,
      enum: Object.values(UserRole),
      default: UserRole.VIEWER,
    },

    status: {
      type: String,
      enum: Object.values(UserStatus),
      default: UserStatus.ACTIVE,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
    },
  },
  { timestamps: true },
);

// faster queries
userSchema.index({ email: 1 });
userSchema.index({ companyId: 1 });

export const User = mongoose.model<IUser>("User", userSchema);
