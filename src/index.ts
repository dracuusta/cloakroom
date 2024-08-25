import path from 'path'
import bcrypt from 'bcryptjs'
import session from 'express-session'
import {Strategy as LocalStrategy} from 'passport-local'
import passport from 'passport'
import dotenv from 'dotenv'
import express from 'express'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import mongoose from 'mongoose'
import {  ProcessEnv } from './types/environment'
const app=express()

dotenv.config({path:__dirname+'/.env'})
const PORT=3000;

app.set('view engine','pug')

const mongoDBURI=process.env["MONGODB_URI"]
if(!mongoDBURI)
  {
  throw "MonogdB empty";
}

mongoose.set("strictQuery",false)
const main=async ()=>{
  await mongoose.connect(mongoDBURI)
}


app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.use('/catalog',userRouter)
app.use('/auth',authRouter)


app.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`)
})
