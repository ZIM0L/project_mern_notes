import { RequestHandler } from "express";
import NoteModel from "../models/note"; //create collection on import
import BlogModel from "../models/blog";


export const getNotes : RequestHandler = async (req, res, next) => {
    try {
      const notes = await NoteModel.find();
      res.status(200).json(notes);
      res.end();
    } catch (error) {
      next(error) //middleware
    }
  };
export const getBlog : RequestHandler = async (req, res, next) => {
    try {
      const blog = await BlogModel.find();
      res.status(200).json(blog);
      res.end();
    } catch (error) {
      next(error) //middleware
    }
  };
  
