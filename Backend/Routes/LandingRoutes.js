import { Router } from "express";
import { getLandingData } from '../Controllers/LandingController.js'

const router = Router();

router.get('/getLandingData', getLandingData);

export default router;