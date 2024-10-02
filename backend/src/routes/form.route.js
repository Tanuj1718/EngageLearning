import { Router } from "express";
import { createResponse } from "../controllers/form.controller.js";

const router = Router()
router.route('/ideas').post(createResponse)
export default router