import { Router } from "express";
import authRoutes from "./modules/auth/auth.routes";
import recordRoutes from "./modules/record/record.routes";
import dashboardRoutes from "./modules/dashboard/dashboard.routes";
import userRoutes from "./modules/user/user.routes"

const router = Router();

router.use("/auth", authRoutes);
router.use("/records", recordRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/users", userRoutes)

export default router;
