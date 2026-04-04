import { Request, Response, NextFunction } from "express";

type ErrorWithMeta = Error & {
  statusCode?: number;
  data?: unknown;
  code?: number;
  keyValue?: Record<string, unknown>;
};

// Handles all errors: Server as well as validation
export const errorMiddleware = (
  err: ErrorWithMeta,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err);

  let status = err.statusCode || 500;
  let message = err.message || "Internal Server Error";
  let data = err.data ?? null; // For validation errors it is filled with errors

  // Mongo duplicate key error.
  if (err.code === 11000) {
    status = 409;
    message = "Duplicate field value";
    data = { fields: err.keyValue ?? null };
  }

  // Mongoose validation error.
  if (err.name === "ValidationError") {
    status = 400;
    message = "Validation failed";
  }

  // invalid Mongo ObjectId in params/query.
  if (err.name === "CastError") {
    status = 400;
    message = "Invalid identifier";
    data = null;
  }

  if (status === 500) {
    message = "Internal Server Error";
    data = null;
  }

  if (status === 401) {
    message = "Authentication Failed! Please Login Again.";
    data = null;
  }

  res.status(status).json({
    success: false,
    message,
    data,
  });
};
