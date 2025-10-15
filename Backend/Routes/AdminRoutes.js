import { Router } from "express";
import { updateCentreStatus, getAdminDashbordData } from "../Controllers/AdminController.js";

const router = Router();

router.patch('/centreStatusUpdate', updateCentreStatus);

router.get('/getAdminDashbordData', getAdminDashbordData);

export default router;