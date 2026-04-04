export class AppError extends Error {
  statusCode: number;
  data: unknown;

  constructor(message: string, statusCode = 500, data: unknown = null) {
    super(message);
    this.name = "AppError";
    this.statusCode = statusCode;
    this.data = data;

    // Maintains proper stack trace in V8 environments.
    Error.captureStackTrace?.(this, AppError);
  }
}
