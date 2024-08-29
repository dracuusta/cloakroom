import { Types } from "mongoose";

export interface IPost{
  title:String,
  message:String,
  posted_at:Date,
 user:Types.ObjectId
}
