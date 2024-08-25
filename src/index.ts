import path from 'path'
import bcrypt from 'bcryptjs'
import session from 'express-session'
import {Strategy as LocalStrategy} from 'passport-local'
import passport from 'passport'
import express from 'express'
import userRouter from './routes/user'
import authRouter from './routes/auth'

const app=express()

const PORT=3000;

app.set('view engine','pug')


app.set('views',path.join(__dirname,'views'))
app.use(express.static(path.join(__dirname,'public')))

app.use('/catalog',userRouter)
app.use('/auth',authRouter)


app.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`)
})
