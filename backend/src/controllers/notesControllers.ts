import { RequestHandler } from "express";
import NoteModel from "../models/note"; //create collection on import

export const getNotes : RequestHandler = async (req, res, next) => {
    try {
      const notes = await NoteModel.find();
      res.status(200).json(notes);
      res.end();
    } catch (error) {
      next(error) //middleware
    }
  };
