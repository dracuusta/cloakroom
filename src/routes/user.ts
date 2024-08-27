import {Router} from 'express'
import {index} from '../controller/userController'
import { isAuthenticated } from '../middleware/passport';









const router=Router();

router.get('/',isAuthenticated,index);


export default router;
