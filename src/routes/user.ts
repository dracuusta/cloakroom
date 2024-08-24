import {Router} from 'express'



import UserController from '../controller/userController'






const router=Router();

router.get('/',UserController.index);


export default router;
