import { Router } from "express";
import {get_membership,get_login, get_signup,post_signup,post_get_membership} from "../controller/authController"
import passport from 'passport'






const router=Router()

router.get('/sign-up',get_signup)
router.post('/sign-up',post_signup)

router.get('/:id/get_membership',get_membership)
router.post('/:id/get_membership',post_get_membership)

router.get('/login',get_login)
router.post('/login',
  passport.authenticate('local',{
  successRedirect:'/',
  failureRedirect:'/auth/login'
  }
));
export default router;
