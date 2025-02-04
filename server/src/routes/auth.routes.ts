import auth from "../middlewares/auth.middleware.js";
import authControllers from "../controllers/auth.controller.js";
import { Router } from "express";
import { user } from "../Schemas/zodSchema.js";
import {validateData} from '../middlewares/zod.middleware.js';

const authRoutes = Router();

authRoutes.post('/signUp',validateData(user),authControllers.signUp);
authRoutes.post('/signIn',authControllers.signIn);
authRoutes.post('/logout',auth,authControllers.logout);

export default authRoutes; 