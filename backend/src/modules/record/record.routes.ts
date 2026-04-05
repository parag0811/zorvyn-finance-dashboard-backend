import { Router } from "express";
import {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} from "./record.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";
import { body, query, param } from "express-validator";
import { validate } from "../../middlewares/validate.middleware";

export const createRecordValidation = [
  body("amount").isNumeric().withMessage("Amount must be a number").notEmpty(),

  body("type")
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category").notEmpty().withMessage("Category is required"),
];

export const updateRecordValidation = [
  param("id").isMongoId().withMessage("Invalid record ID"),

  body("amount").optional().isNumeric().withMessage("Amount must be a number"),

  body("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Type must be income or expense"),

  body("category")
    .optional()
    .notEmpty()
    .withMessage("Category cannot be empty"),
];

export const getRecordsValidation = [
  query("type")
    .optional()
    .isIn(["income", "expense"])
    .withMessage("Invalid type"),

  query("category").optional().isString(),

  query("startDate").optional().isISO8601().withMessage("Invalid startDate"),

  query("endDate").optional().isISO8601().withMessage("Invalid endDate"),

  query("search").optional().isString().withMessage("Search must be string"),
];

// Pagination query validation
export const paginationValidation = [
  query("page").optional().isInt({ min: 1 }).withMessage("Page must be >= 1"),

  query("limit")
    .optional()
    .isInt({ min: 1, max: 50 })
    .withMessage("Limit must be between 1 and 50"),
];

const router = Router();

router.post(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST"),
  createRecordValidation,
  validate,
  createRecord,
);

// Viewers are allowed to fetch data (read-only)
router.get(
  "/",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  getRecordsValidation,
  paginationValidation,
  validate,
  getRecords,
);

router.patch(
  "/:id",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST"),
  updateRecordValidation,
  validate,
  updateRecord,
);

router.delete("/:id", authMiddleware, allowRoles("ADMIN"), deleteRecord);

export default router;
