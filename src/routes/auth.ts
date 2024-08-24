import { Router } from "express";
import AuthController from '../controller/authController'






const router=Router()

router.get('/sign-up',AuthController.signup)

export default router;
