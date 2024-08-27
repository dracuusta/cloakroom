import { Request, Response } from "express";
import bcrypt from 'bcryptjs'
import User from "../models/user"
import { body,validationResult } from "express-validator";
import asyncHandler from "express-async-handler";
export const get_signup = (_req: Request, res: Response): void => {
  res.render("sign_up", {
    title: "Sign-Up"
  });
};

export const post_signup = [
  body('first_name', 'First name must be present and at least 3 characters long')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('last_name', 'Last name must be present and at least 3 characters long')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('username', 'Username must be present')
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body('password', 'Password must be at least 8 characters long')
    .isLength({ min: 8 }),
  body('confirmPassword').custom((value, { req }) => {
    console.log(req.body)
    if (value !== req.body.password) {
      throw new Error('Passwords do not match');
    }
    return true;
  }),
  asyncHandler(async (req: Request, res: Response) => {
    const errors = validationResult(req);
    const hashedPassword=await bcrypt.hash(req.body.password,10)
    const user=new User({first_name:req.body.first_name,last_name:req.body.last_name,username:req.body.username,password:hashedPassword,membership_status:false})
    if (!errors.isEmpty()) {
       res.render("sign_up", {
        title: "Sign-Up",
        errors: errors.array()
      });
      return;
    }
    else{
    user.save(); 
    res.redirect("/catalog/index")
    }

  })
];

