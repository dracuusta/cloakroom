import { Request, Response} from "express";

class User{
  public static index(_req:Request,res:Response):void{
    res.render("index",{
      title:"home page"
    })
  }
}
export default User;

