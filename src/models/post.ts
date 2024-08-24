import { model, Schema } from "mongoose";
import { IPost } from "src/types/postModel";


const PostSchema=new Schema<IPost>({
  title:{
    type:String,
    required:[true, "title is required"],
  },
  message:{
    type:String,
    min:5,
    required:[true,"message needs to be here"],
  },
  posted_at:{
    type:Date,
    default:Date.now(),
    required:true
  }
})

const Post=model<IPost>("Post",PostSchema)

export default Post;
