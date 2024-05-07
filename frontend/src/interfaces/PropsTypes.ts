import { Note } from "../models/note";

export type NoteProps = {
    note: Note
}
export type DialogProps = {
    onClose : () => void 
}

export type NoteInput = {
    title: string,
    text: string
}