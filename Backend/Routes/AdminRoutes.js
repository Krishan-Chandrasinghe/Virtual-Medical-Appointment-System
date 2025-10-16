import { Router } from "express";
import { updateCentreStatus, getAdminDashboardData } from "../Controllers/AdminController.js";

const router = Router();

router.patch('/centreStatusUpdate', updateCentreStatus);

router.get('/getAdminDashboardData', getAdminDashboardData);

export default router;