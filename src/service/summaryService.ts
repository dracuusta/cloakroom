import { HfInference } from "@huggingface/inference";
import Post from "../models/post"

require('dotenv').config()
// Initialize Hugging Face Inference API client

// Function to query all posts and summarize them
export const summarize_posts = async () => {
  // Fetch all posts from the database
  const posts = await Post.find().sort({posted_at:1});
  const hf = new HfInference(process.env["HUGGINGFACE_API_KEY"]); // Add API key from environment variables

  // Combine all post contents into a single string
  const content = posts.map(post => post.message).join(" ");

  console.log('Hugging Face API Key:', process.env["HUGGINGFACE_API_KEY"]);


  // Call the Hugging Face summarization model
  const summary = await hf.summarization({
    model: 'facebook/bart-large-cnn',  // Free summarization model
    inputs: content
  });

  return summary;
};
