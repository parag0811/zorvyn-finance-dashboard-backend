import { NextFunction, Request, Response } from "express";
import { registerService, loginService } from "./auth.service";

// user register company along with sign-up
export const register = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = await registerService(req.body);

    res.status(201).json({
      success: true,
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
    const result = await loginService(req.body);

    res.status(200).json({
      success: true,
      data: result,
      message: "Login successful",
    });
  } catch (error: any) {
    next(error);
  }
};
