import mongoose, { Schema, Document, Types } from "mongoose";

export interface ICompany extends Document {
  name: string;
  ownerId: Types.ObjectId;
}

const companySchema = new Schema<ICompany>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export const Company = mongoose.model<ICompany>("Company", companySchema);