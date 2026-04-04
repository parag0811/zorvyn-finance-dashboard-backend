import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
import { AppError } from "../utils/appError";

export const validate = (req: Request, res: Response, next: NextFunction) => {
  const errors = validationResult(req);

  // Goes to error middleware
  if (!errors.isEmpty()) {
    return next(new AppError("Validation failed", 400, { errors: errors.array() }));
  }

  next();
};
