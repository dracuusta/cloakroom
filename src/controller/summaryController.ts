import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";
import Post from "../models/post";
import { HfInference } from '@huggingface/inference';

require('dotenv').config()
// Initialize Hugging Face Inference API client

// Function to query all posts and summarize them
export const summarize_posts = expressAsyncHandler(async (_req: Request, res: Response, _next: NextFunction) => {
  // Fetch all posts from the database
  const posts = await Post.find();
const hf = new HfInference(process.env["HUGGINGFACE_API_KEY"]); // Add API key from environment variables

  // Combine all post contents into a single string
  const content = posts.map(post => post.message).join(" ");

  console.log('Hugging Face API Key:', process.env["HUGGINGFACE_API_KEY"]);

  if (content.length === 0) {
    return res.render('summary', {
      summary: 'No content to summarize.',
      posts: posts
    });
  }

  // Call the Hugging Face summarization model
  const summary = await hf.summarization({
    model: 'facebook/bart-large-cnn',  // Free summarization model
    inputs: content
  });

  // Render summary along with all posts
  res.render('summary', {
    summary: summary.summary_text,
    posts: posts
  });
});
