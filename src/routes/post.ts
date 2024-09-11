import {  Router } from "express";
import { get_post ,post_post} from "../controller/postController";
import { isAuthenticated } from "../middleware/passport";
import { summarize_posts } from "../controller/summaryController";






const router=Router()

router.get('/post',isAuthenticated,get_post)
router.get('/summarize', summarize_posts);
router.post('/post',post_post);
export default router
