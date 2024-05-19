import { RequestHandler } from "express";
import NoteModel from "../models/noteSchema"; //create collection on import
import {
  CreateNoteBody,
  DeleteNoteParamas,
  UpdateNoteBody,
  UpdateNoteParams,
} from "../utils/noteInterface";
import createHttpError from "http-errors";
import mongoose from "mongoose";
import { assertsIsDefined } from "../utils/assersDefined";

export const getNotes: RequestHandler = async (req, res, next) => {
  const authenticationUserId = req.session.userId;
  try {
    //check if userId is null
    assertsIsDefined(authenticationUserId);
    // gets only auth user notes
    const notes = await NoteModel.find({ userId: authenticationUserId }).exec();
    res.status(200).json(notes);
    res.end();
  } catch (error) {
    next(error); //middleware
  }
};

export const getNote: RequestHandler = async (req, res, next) => {
  const noteId = req.params.noteId; // params are after "/:"
  const authenticationUserId = req.session.userId;

  try {
    assertsIsDefined(authenticationUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      // checks if id suits for id format
      throw createHttpError(400, "invalid note Id"); //bad request
    }
    const note = await NoteModel.findById(noteId).exec();
    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId?.equals(authenticationUserId)) {
      throw createHttpError(401, "You cannot access this note");
    }

    res.status(200).json(note); // back to client
  } catch (error) {
    next(error);
  }
};

// arguments for types ???
export const createNote: RequestHandler<
  unknown,
  unknown,
  CreateNoteBody
> = async (req, res, next) => {
  const title = req.body.title;
  const text = req.body.text;
  const authenticationUserId = req.session.userId;

  try {
    assertsIsDefined(authenticationUserId);

    if (!title) {
      // We can declare how we handle if no title. Normally it throws error, if there is no title in request. We said that title is required is schema
      throw createHttpError(400, "title is needed"); // bad request, missing param in request
    }
    const newNote = await NoteModel.create({
      //Promise
      userId: authenticationUserId,
      title: title,
      text: text,
    });
    res.status(201).json(newNote); // back to client
  } catch (error) {
    next(error);
  }
};
//  first is type of params, third is type of body (request), fourth is rul params (?)
export const updateNote: RequestHandler<
  UpdateNoteParams,
  unknown,
  UpdateNoteBody
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const newTitle = req.body.title;
  const newText = req.body.text;
  const authenticationUserId = req.session.userId;

  try {
    assertsIsDefined(authenticationUserId);
    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "invalid note Id");
    }
    if (!newTitle) {
      throw createHttpError(400, "title is needed");
    }
    const note = await NoteModel.findById(noteId).exec();

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId?.equals(authenticationUserId)) {
      throw createHttpError(401, "You cannot access this note");
    }

    note.title = newTitle;
    note.text = newText;

    await note.save();
    res.status(200).json("Note has been updated");
  } catch (error) {
    next(error);
  }
};
export const deleteNote: RequestHandler<
  DeleteNoteParamas,
  unknown,
  unknown
> = async (req, res, next) => {
  const noteId = req.params.noteId;
  const authenticationUserId = req.session.userId;
  try {
    assertsIsDefined(authenticationUserId);

    if (!mongoose.isValidObjectId(noteId)) {
      throw createHttpError(400, "Invalid note Id");
    }
    const note = await NoteModel.findById(noteId);

    if (!note) {
      throw createHttpError(404, "Note not found");
    }

    if (!note.userId?.equals(authenticationUserId)) {
      throw createHttpError(401, "You cannot access this note");
    }

    await NoteModel.findByIdAndDelete(noteId);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
