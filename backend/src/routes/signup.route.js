import { Router } from "express";
import {Signup} from "../controllers/auth.controller.js";
import cors from 'cors'

const router = Router()
router.use(cors())
router.route('/signup').post(Signup)
export default router