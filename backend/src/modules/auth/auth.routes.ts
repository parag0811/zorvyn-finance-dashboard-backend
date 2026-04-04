import { Router } from "express";
import { body } from "express-validator";
import { login, register } from "./auth.controller";
import { validate } from "../../middlewares/validate.middleware";

const router = Router();

router.post(
  "/register",
  [
    body("email").isEmail(),
    body("password").isLength({ min: 6 }),
    body("name").notEmpty(),
    body("companyName").notEmpty(),
  ],
  validate,
  register,
);

router.post(
  "/login",
  [body("email").isEmail(), body("password").isLength({ min: 6 })],
  validate,
  login,
);

export default router;
