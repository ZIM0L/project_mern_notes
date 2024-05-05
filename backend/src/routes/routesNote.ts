import express from "express";
import * as NoteController from "../controllers/notesControllers";

const routerNotes = express.Router(); //endpoint of our server that is already created
routerNotes.get("/", NoteController.getNotes);
routerNotes.get("/:noteId", NoteController.getNote); //noteId is a variable
routerNotes.post("/", NoteController.createNote);
routerNotes.patch("/:noteId",NoteController.updateNote); // patch vs put. patch updates only some data, put updates whole record
routerNotes.delete("/:noteId",NoteController.deleteNote); // patch vs put. patch updates only some data, put updates whole record

export default routerNotes;
