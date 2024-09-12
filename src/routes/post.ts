import {  Router } from "express";
import { get_post ,post_post} from "../controller/postController";
import { isAuthenticated } from "../middleware/passport";
<<<<<<< HEAD




=======
>>>>>>> d08f229 (removed .env)


const router=Router()

router.get('/post',isAuthenticated,get_post)
router.post('/post',post_post);
export default router
