import {Types} from 'mongoose'
export interface IUser{
  first_name:String,
  last_name:String,
  username:String,
  password:String,
  membership_status:Boolean,
  post:Types.ObjectId
}
