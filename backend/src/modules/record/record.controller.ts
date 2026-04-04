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

    const record = await createRecordService(req.body, user);

    return res.status(201).json({
      success: true,
      data: record,
    });
  } catch (error) {
    console.log(error)
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
    const records = await getRecordsService(req.query, user);

    return res.status(200).json({
      success: true,
      data: records,
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
    const record = await updateRecordService(req.params.id, req.body, user);
    return res.status(200).json({
      success: true,
      data: record,
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
    });
  } catch (error) {
    next(error);
  }
};
