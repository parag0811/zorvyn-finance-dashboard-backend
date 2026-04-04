import { Router } from "express";
import {
  getSummary,
  getCategoryBreakdown,
  getRecentRecords,
  getMonthlyTrends,
} from "./dashboard.controller";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { allowRoles } from "../../middlewares/role.middleware";
import { validate } from "../../middlewares/validate.middleware";
import { query } from "express-validator";

export const recentValidation = [
  query("limit")
    .optional()
    .isInt({ min: 1, max: 20 })
    .withMessage("Limit must be between 1 and 20"),
];

export const trendsValidation = [
  query("year")
    .optional()
    .isInt({ min: 2000, max: 2100 })
    .withMessage("Year must be valid"),
];

const router = Router();

router.get(
  "/summary",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  validate,
  getSummary,
);

router.get(
  "/categories",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  validate,
  getCategoryBreakdown,
);

router.get(
  "/recent",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  recentValidation,
  validate,
  getRecentRecords,
);

router.get(
  "/trends",
  authMiddleware,
  allowRoles("ADMIN", "ANALYST", "VIEWER"),
  trendsValidation,
  validate,
  getMonthlyTrends,
);

export default router;
