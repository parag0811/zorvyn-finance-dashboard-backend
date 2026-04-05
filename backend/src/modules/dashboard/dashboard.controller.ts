import { Request, Response, NextFunction } from "express";
import {
  getSummaryService,
  getCategoryBreakdownService,
  getRecentRecordsService,
  getMonthlyTrendsService,
} from "./dashboard.service";

export const getSummary = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const data = await getSummaryService(user);

    return res.status(200).json({
      success: true,
      data,
      message: "Dashboard summary fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryBreakdown = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const data = await getCategoryBreakdownService(user);

    return res.status(200).json({
      success: true,
      data,
      message: "Dashboard data fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getRecentRecords = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const limit = Number(req.query.limit) || 5;

    const data = await getRecentRecordsService(user, limit);

    return res.status(200).json({
      success: true,
      data,
      message: "Recent records fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getMonthlyTrends = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const year = req.query.year ? Number(req.query.year) : undefined;

    const data = await getMonthlyTrendsService(user, year);

    return res.status(200).json({
      success: true,
      data,
      message: "Monthly Trends fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};
