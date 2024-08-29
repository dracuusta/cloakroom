import path from 'path'
import logger from 'morgan'
import dotenv from 'dotenv'
import express from 'express'
import cookieParser from 'cookie-parser'
import userRouter from './routes/user'
import postRouter from './routes/post'
import authRouter from './routes/auth'
import mongoose from 'mongoose'
import { initPassport } from './middleware/passport'
import session from 'express-session'
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
app.use(session({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));
initPassport(app);

app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/',userRouter)
app.use('/',postRouter)
app.use('/auth',authRouter)


app.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`)
})
