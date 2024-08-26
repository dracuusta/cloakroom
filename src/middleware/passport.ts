import {Strategy as LocalStrategy} from 'passport-local'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import {Express,Request,Response,NextFunction} from "express"
import {IUser} from '../types/user'
import User from '../models/user'

export function initPassport(app:Express){
  app.use(passport.initialize());
  app.use(passport.authenticate('session'));

  passport.use(new LocalStrategy(
    async(username,password,done)=>{
      try{
        const user:IUser=await User.findOne({username:username}).exec();
        if(!user){
          return done(null,false,{message:'Incorrect username'})
        }
        bcrypt.compare(password,user.password,(_err,res)=>{
          if(res){
            return done(null,user);
          }
          else{
            return done(null,false,{message:'Incorect Password'})
          }
        })
      } catch(err){
        return done(err)
      }
    }
  ))
}


export function isAuthenticated(req:Request,res:Response,next:NextFunction):Response|void{
  if(req.user)
    return next()
  else
  res.redirect("/auth/login")
}




