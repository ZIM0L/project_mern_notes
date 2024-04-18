import BlogModel from "../models/blog";
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
  
