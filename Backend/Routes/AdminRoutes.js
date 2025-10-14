import { Router } from "express";
import { updateCentreStatus } from "../Controllers/AdminController.js";

const router = Router();

router.patch('/centreStatusUpdate', updateCentreStatus);

export default router;