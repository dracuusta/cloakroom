import {Request, Response} from "express"

class Auth{
  public static signup(_req:Request,res:Response):void{
    res.render("sign_up",{
      title:"Sign-Up"
    })
  }
}


export default Auth;
