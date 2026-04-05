import { Request, Response, NextFunction } from "express";
import {
  createRecordService,
  getRecordsService,
  updateRecordService,
  deleteRecordService,
} from "./record.service";

export const createRecord = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    console.log("REQ.USER:", (req as any).user);

    const data = await createRecordService(req.body, user);

    return res.status(201).json({
      success: true,
      data,
      message: "Record created successfully",
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getRecords = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    const data = await getRecordsService(req.query, user);

    return res.status(200).json({
      success: true,
      data: {
        items: data.records,
        pagination: data.pagination,
      },
      message: "Records fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateRecord = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;
    const data = await updateRecordService(req.params.id, req.body, user);
    return res.status(200).json({
      success: true,
      data,
      message: "Record updated successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteRecord = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    await deleteRecordService(req.params.id, user);

    return res.status(200).json({
      success: true,
      data: null,
      message: "Record deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
