import { NextFunction, Request, Response} from "express";
import expressAsyncHandler from "express-async-handler";
import { body, validationResult } from "express-validator";
import Post from "../models/post";

export const get_post=(_req:Request,res:Response):void=>{
    res.render("create_post",{
    })
  }


export const post_post=[
 body("post_title")
 .trim(),
 body("post_content")
 .trim(),
 expressAsyncHandler(async(req:Request,res:Response,_next:NextFunction)=>{
  const errors=validationResult(req);
  if(!errors.isEmpty()){
   res.render("error",{
    errors:errors.array()
   })
  }
  let post=new Post({title:req.body.post_title,message:req.body.post_content,user:req.user?.id});

  post.save();
  console.log(post);
  res.redirect('/')
 
 })
];

