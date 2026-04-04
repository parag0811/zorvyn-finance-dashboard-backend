import { Record } from "../record/record.model";
import { AppError } from "../../utils/appError";

export const getSummaryService = async (user: any) => {
  if (!user?.companyId) {
    throw new AppError("Invalid user context", 400);
  }

  const companyId = user.companyId;

  const result = await Record.aggregate([
    {
      $match: {
        companyId,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$type",
        total: { $sum: "$amount" },
      },
    },
  ]);

  let income = 0;
  let expense = 0;

  result.forEach((item) => {
    if (item._id === "income") income = item.total;
    if (item._id === "expense") expense = item.total;
  });

  return {
    totalIncome: income,
    totalExpense: expense,
    netBalance: income - expense,
  };
};

export const getCategoryBreakdownService = async (user: any) => {
  if (!user?.companyId) {
    throw new AppError("Invalid user context", 400);
  }

  return await Record.aggregate([
    {
      $match: {
        companyId: user.companyId,
        isDeleted: false,
      },
    },
    {
      $group: {
        _id: "$category",
        total: { $sum: "$amount" },
      },
    },
  ]);
};

export const getRecentRecordsService = async (user: any, limit: number) => {
  if (!user?.companyId) {
    throw new AppError("Invalid user context", 400);
  }

  return await Record.find({
    companyId: user.companyId,
    isDeleted: false,
  })
    .sort({ createdAt: -1 })
    .limit(limit);
};

export const getMonthlyTrendsService = async (user: any, year?: number) => {
  if (!user?.companyId) {
    throw new AppError("Invalid user context", 400);
  }

  const matchStage: any = {
    companyId: user.companyId,
    isDeleted: false,
  };

  if (year) {
    matchStage.date = {
      $gte: new Date(`${year}-01-01`),
      $lte: new Date(`${year}-12-31`),
    };
  }

  const result = await Record.aggregate([
    { $match: matchStage },
    // group by year + month + type
    {
      $group: {
        _id: {
          year: { $year: "$date" },
          month: { $month: "$date" },
          type: "$type",
        },
        total: { $sum: "$amount" },
      },
    },
    // regroup into type
    {
      $group: {
        _id: {
          year: "$_id.year",
          month: "$_id.month",
        },
        income: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "income"] }, "$total", 0],
          },
        },
        expense: {
          $sum: {
            $cond: [{ $eq: ["$_id.type", "expense"] }, "$total", 0],
          },
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);

  // formatted response
  return result.map((item) => ({
    month: `${item._id.year}-${String(item._id.month).padStart(2, "0")}`,
    income: item.income,
    expense: item.expense,
  }));
};
