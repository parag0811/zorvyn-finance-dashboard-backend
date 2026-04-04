import mongoose, { Schema, Document, Types } from "mongoose";

export enum RecordType {
  INCOME = "income",
  EXPENSE = "expense",
}

export interface IRecord extends Document {
  amount: number;
  type: RecordType;
  category: string;
  date: Date;
  notes?: string;
  createdBy: Types.ObjectId;
  companyId: Types.ObjectId;
  isDeleted: boolean;
}

const recordSchema = new Schema<IRecord>(
  {
    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: Object.values(RecordType),
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      default : Date.now
    },

    notes: {
      type: String,
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    companyId: {
      type: Schema.Types.ObjectId,
      ref: "Company",
      required: true,
    },

    // for safe deletion 
    isDeleted: {
      type: Boolean,
      default: false, 
    },
  },
  { timestamps: true }
);

// indexing
recordSchema.index({ companyId: 1 });
recordSchema.index({ date: -1 });

export const Record = mongoose.model<IRecord>("Record", recordSchema);