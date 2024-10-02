import { Router } from "express";
import {Signin} from "../controllers/auth.controller.js";
import cors from 'cors'


const router = Router()
router.use(cors())
router.route('/signin').post(Signin)
export default router