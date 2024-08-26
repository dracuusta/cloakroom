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


  passport.serializeUser((user,done)=>{
    done(null,user)
  })
  passport.deserializeUser(async (user:IUser,done)=>{
    try{

    const userSearched:IUser|null=await User.findById(user.id)

      if(!userSearched)
    {
        return done(null,false)
      }
      else{
    done(null,userSearched.id)

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




