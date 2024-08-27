import { Request, Response} from "express";

export const index=(_req:Request,res:Response):void=>{
    res.render("index",{
      title:"home page"
    })
  }

