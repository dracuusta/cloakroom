import {Types} from 'mongoose'
export interface IUser{
  id:Types.ObjectId,
  first_name:string,
  last_name:string,
  username:string,
  password:string,
  membership_status:Boolean,
  post:Types.ObjectId
}
