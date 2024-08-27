import {Router} from 'express'
import {index} from '../controller/userController'









const router=Router();

router.get('/',index);


export default router;
