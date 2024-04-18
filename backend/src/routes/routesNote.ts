import express from "express";
import * as NoteController from "../controllers/notesControllers";

const routerNotes = express.Router(); //endpoint of our server that is already created
routerNotes.get("/", NoteController.getNotes)

export default routerNotes ;