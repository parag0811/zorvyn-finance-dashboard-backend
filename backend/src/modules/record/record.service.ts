import { AppError } from "../../utils/appError";
import { Record } from "./record.model";

// creates record of transaction or any other thing
export const createRecordService = async (data: any, user: any) => {
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  if (!data) {
    throw new AppError("No data was given", 404);
  }

  return await Record.create({
    ...data,
    createdBy: user.userId,
    companyId: user.companyId,
  });
};

// get all records
export const getRecordsService = async (query: any, user: any) => {
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }
  const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;

  const skip = (page - 1) * limit;

  const filter: any = {
    companyId: user.companyId,
    isDeleted: false,
  };

  if (query.type) filter.type = query.type;
  if (query.category) filter.category = query.category;

  // searching query
  if (query.search) {
    filter.$or = [
      { notes: { $regex: query.search, $options: "i" } },
      { category: { $regex: query.search, $options: "i" } },
    ];
  }

  if (query.startDate && query.endDate) {
    filter.date = {
      $gte: new Date(query.startDate),
      $lte: new Date(query.endDate),
    };
  }

  const records = await Record.find(filter)
    .sort({ date: -1 })
    .skip(skip)
    .limit(limit);

  const total = await Record.countDocuments(filter);

  return {
    records,
    pagination: {
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    },
  };
};

// update record
export const updateRecordService = async (id: string, data: any, user: any) => {
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  if (!data) {
    throw new AppError("No data was given", 404);
  }

  const record = await Record.findOneAndUpdate(
    {
      _id: id,
      companyId: user.companyId,
      isDeleted: false,
    },
    data,
    { new: true },
  );

  if (!record) {
    throw new AppError("Record not found", 404);
  }

  return record;
};

// delete particular record
export const deleteRecordService = async (id: string, user: any) => {
  if (!user) {
    throw new AppError("Unauthorized", 401);
  }

  const record = await Record.findOneAndUpdate(
    {
      _id: id,
      companyId: user.companyId,
    },
    { isDeleted: true },
    { new: true },
  );

  if (!record) {
    throw new AppError("Record not found", 404);
  }

  return record;
};
