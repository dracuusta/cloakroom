import path from 'path'
import logger from 'morgan'
import session from 'express-session'
import passport from 'passport'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user'
import authRouter from './routes/auth'
import mongoose from 'mongoose'
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
main().catch((err)=>console.log(err))


app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/catalog',userRouter)
app.use('/auth',authRouter)


app.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`)
})
