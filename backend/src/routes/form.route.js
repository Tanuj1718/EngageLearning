import { Router } from "express";
import { createResponse } from "../controllers/form.controller.js";
import cors from 'cors'

const router = Router()
router.use(cors())
router.route('/ideas').post(createResponse)
export default router