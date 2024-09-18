
import { model, Schema } from "mongoose";
import { ISummary } from "src/types/summary";


const SummarySchema=new Schema<ISummary>({
  content:{
    type:String,
  },
})

const Post=model<ISummary>("Summary",SummarySchema)

export default Post;
