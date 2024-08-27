import { Router } from "express";
import {get_signup,post_signup} from "../controller/authController"






const router=Router()

router.get('/sign-up',get_signup)
router.post('/sign-up',post_signup)

export default router;
