import {Strategy as LocalStrategy} from 'passport-local'
import passport from 'passport'
import bcrypt from 'bcryptjs'
import {Express,Request,Response,NextFunction} from "express"
import {IUser} from '../types/user'
import User from '../models/user'
import { Types } from 'mongoose'

declare global{
  namespace Express{
    interface User extends IUser{}
  }
}

export function initPassport(app:Express){
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(new LocalStrategy(
    async(username,password,done)=>{
      try{
        const user:IUser|null=await User.findOne({username:username})
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


  passport.serializeUser((user:Express.User,done)=>{
    const userWithId=user ;
    done(null,userWithId.id.toString())
  })
  passport.deserializeUser(async (id:string,done)=>{
    try{

    const userSearched=await User.findById(new Types.ObjectId(id))

      if(!userSearched)
    {
        return done(null,false)
      }
      else{
    done(null,userSearched)

      }
    }
    catch(error){
      return done(error)
    }
  })
}


export function isAuthenticated(req:Request,res:Response,next:NextFunction):Response|void{
  if(req.user)
    return next()
  else
  res.redirect("/auth/login")
}




export function isAuthenticatedForLogin(req:Request,res:Response,next:NextFunction):Response|void{
  if(req.user)
  res.redirect("/")
  else
  next()
}
