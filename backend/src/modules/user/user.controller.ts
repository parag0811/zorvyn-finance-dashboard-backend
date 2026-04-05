import { Request, Response, NextFunction } from "express";
import {
  createUserService,
  getUsersService,
  updateUserService,
} from "./user.service";

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const newUser = await createUserService(req.body, user);

    return res.status(201).json({
      success: true,
      data: newUser,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const data = await getUsersService(user, req.query);

    return res.status(200).json({
      success: true,
      data: {
        items: data.users,
        pagination: data.pagination,
      },
      message: "Users fetched successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (
  req: Request<{ id: string }, {}, {}>,
  res: Response,
  next: NextFunction,
) => {
  try {
    const user = (req as any).user;

    const updatedUser = await updateUserService(req.params.id, req.body, user);

    return res.status(200).json({
      success: true,
      data: updatedUser,
      message: "User updated successfully",
    });
  } catch (error) {
    next(error);
  }
};
