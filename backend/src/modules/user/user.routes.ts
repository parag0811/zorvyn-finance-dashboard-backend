import { Router } from "express";
import { createUser, getUsers, updateUser } from "./user.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { body, param } from "express-validator";

export const createUserValidation = [
  body("name").notEmpty().withMessage("Name is required"),

  body("email").isEmail().withMessage("Valid email required"),

  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 chars"),

  body("role").isIn(["ADMIN", "ANALYST", "VIEWER"]).withMessage("Invalid role"),
];

export const updateUserValidation = [
  param("id").isMongoId().withMessage("Invalid user ID"),

  body("role")
    .optional()
    .isIn(["ADMIN", "ANALYST", "VIEWER"])
    .withMessage("Invalid role"),

  body("status")
    .optional()
    .isIn(["ACTIVE", "INACTIVE"])
    .withMessage("Invalid status"),
];

const router = Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN"),
  createUserValidation,
  validate,
  createUser,
);

router.get("/", authMiddleware, allowRoles("ADMIN"), getUsers);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN"),
  updateUserValidation,
  validate,
  updateUser,
);

export default router;
