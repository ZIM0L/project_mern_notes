import express from "express";
import * as NoteController from "../controllers/notesControllers";

const routerNotes = express.Router(); //endpoint of our server that is already created
const routeAnimalas = express.Router(); //endpoint of our server that is already created
routerNotes.get("/api/notes", NoteController.getNotes)
routeAnimalas.get("/api/blog", NoteController.getBlog)

export default [routerNotes , routeAnimalas];