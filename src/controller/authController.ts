import {Request, Response} from "express"
import {body, ValidationChain} from "express-validator"

class Auth{
  public static get_signup(_req:Request,res:Response):void{
    res.render("sign_up",{
      title:"Sign-Up"
    })
  }
  public static post_signup(_req:Request,res:Response):void{
    res.render("sign_up",{
      title:"Sign-Up"
    })
  }

  public static validate(func:string):Array<ValidationChain>{
    switch(func){
      case 'post_signup':{
        return [
          body('first_name','first name must be present').trim().isLength({min:3}).escape(),
          body('last_name','last name must be present').trim().isLength({min:3}).escape(),
          body('username','username must be present').trim().isLength({min:1}).escape(),
          body('password','minimum length must be 8 characters').isLength({min:8}),
          body('confirmPassword').custom((value,{req})=>{
            return value===req.body.password;
          })

        ]
      }
      default:
      body('name').escape()
    }
    throw new Error("the code shouldn't reach here")

  }
}


export default Auth;
