import path from 'path'
import express from 'express'
import userRouter from './routes/user'

const app=express()

const PORT=3000;

app.set('view engine','pug')


app.set('views',path.join(__dirname,'views'))

app.use('/',userRouter)


app.listen(PORT,()=>{
  console.log(`Running on PORT ${PORT}`)
})
