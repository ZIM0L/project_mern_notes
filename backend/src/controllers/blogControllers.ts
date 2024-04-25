import BlogModel from "../models/blogSchema";
import { RequestHandler } from "express";

export const getBlog : RequestHandler = async (req, res, next) => {
    try {
      const blog = await BlogModel.find();
      res.status(200).json(blog);
      res.end();
    } catch (error) {
      next(error) //middleware
    }
  };
  
export const createtBlog : RequestHandler = async (req, res, next) => {
    try {
      await BlogModel.create({ title : "random", author: "adiran"})
      res.end();
    } catch (error) {
      next(error) //middleware
    }
  };
  
