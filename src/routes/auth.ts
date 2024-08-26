import { Router } from "express";
import AuthController from '../controller/authController'






const router=Router()

router.get('/sign-up',AuthController.get_signup)
router.post('/sign-up',AuthController.validate('get_signup'),AuthController.get_signup)

export default router;
