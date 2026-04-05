import { NextFunction, Request, Response } from "express";
import { registerService, loginService } from "./auth.service";
import { AppError } from "../../utils/appError";

// user register company along with sign-up
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerService(req.body);

    if (!user) {
      throw new AppError("Error signing up. Try again later.", 503);
    }

    res.status(201).json({
      success: true,
      data: null,
      message: "User registered successfully",
    });
  } catch (error: any) {
    next(error);
  }
};

// login for all users
export const login = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const data = await loginService(req.body);

    res.status(200).json({
      success: true,
      data,
      message: "Login successful",
    });
  } catch (error: any) {
    next(error);
  }
};
