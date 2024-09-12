import Post from "../models/post";
import { Request,Response,NextFunction } from "express";
import expressAsyncHandler from "express-async-handler";
import { summarize_posts } from "../service/summaryService";


export const index=[
 expressAsyncHandler(async(req:Request,res:Response,_next:NextFunction)=>{
  let posts=await Post.find({}).populate('user').sort({posted_at:-1});
  let newPost=posts.map((post)=>({
     ...post.toObject(), // Convert Mongoose document to plain JavaScript object
      posted_at: post.posted_at.toTimeString(),
  }))
  const summary=summarize_posts();
  res.render("index",{
   posts:newPost,
   reqUser:req.user,
    summary_text:(await summary).summary_text
  })
 
 })
]
