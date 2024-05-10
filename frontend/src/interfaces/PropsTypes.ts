import { Note } from "../models/note";

export type NoteProps = {
    note: Note
}
export type DialogProps = {
    onDismiss : () => void 
    onSave: (note : Note) => void
}
export type TopBarProps = {
    notes : Note[],
    setNote : (input : Note[]) => void
}

export type NoteInput = {
    title: string,
    text: string
}