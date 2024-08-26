import {model, Schema} from 'mongoose'
import { IUser } from 'src/types/user'

const userSchema=new Schema<IUser>({
  first_name:{type:String,required:true},
  last_name:{type:String,required:true},
  username:{type:String,required:true},
  password:{
    type:String,
    required:[true,"User Password is required"],
    min:8
  },
  membership_status:{
    type:Boolean,
    required:[true,"Defined a membership status"]
  },
  post:{
    type:Schema.Types.ObjectId,
    ref:'Post'
  }

})

const User=model<IUser>("User",userSchema);

export default User

