import { Note } from "../models/note";

export type NoteProps = {
    note: Note
}
export type DialogProps = {
    onDismiss : () => void 
    onSave: (note : Note) => void
}
export type TopBarProps = {
    onDismiss : (input : boolean) => void 
    onSave: (note : Note) => void
    
}

export type NoteInput = {
    title: string,
    text: string
}