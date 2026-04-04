import { User, UserRole, UserStatus } from "./user.model";
import bcrypt from "bcryptjs";
import { AppError } from "../../utils/appError";

export const createUserService = async (data: any, currentUser: any) => {
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new AppError("Forbidden", 403);
  }

  const { name, email, password, role } = data;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    companyId: currentUser.companyId, // inherit company from the admin
  });

  return user;
};

export const getUsersService = async (currentUser: any) => {
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new AppError("Forbidden", 403);
  }

  return await User.find({
    companyId: currentUser.companyId,
  }).select("-password");
};

export const updateUserService = async (
  id: string,
  data: any,
  currentUser: any,
) => {
  if (!currentUser || currentUser.role !== "ADMIN") {
    throw new AppError("Forbidden", 403);
  }

  const user = await User.findOneAndUpdate(
    {
      _id: id,
      companyId: currentUser.companyId,
    },
    data,
    { new: true },
  ).select("-password");

  if (!user) {
    throw new AppError("User not found", 404);
  }

  return user;
};
