import dotenv from "dotenv";
dotenv.config();

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserRole } from "../user/user.model";
import { Company } from "../company/company.model";
import { AppError } from "../../utils/appError";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const registerService = async (data: {
  name: string;
  email: string;
  password: string;
  companyName: string;
}) => {
  const { name, email, password, companyName } = data;

  // check if user exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("User already exists", 409);
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // create user (ADMIN of the company)
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role: UserRole.ADMIN,
  });

  // create company with ownerId
  const company = await Company.create({
    name: companyName,
    ownerId: user._id, 
  });

  // update user with company id
  user.companyId = company._id;
  await user.save();

  return user;
};

export const loginService = async (data: {
  email: string;
  password: string;
}) => {
  const { email, password } = data;

  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new AppError("Invalid credentials", 401);
  }

  // saving user id, role, company_id inside the JWT
  const token = jwt.sign(
    {
      userId: user._id,
      role: user.role,
      companyId: user.companyId,
    },
    JWT_SECRET,
    { expiresIn: "1d" },
  );

  const { password: _password, ...safeUser} = user.toObject()

  return { user : safeUser, token };
};
