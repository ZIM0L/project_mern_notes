import { Note } from "../models/note";
import { User } from "../models/user";

export type NoteProps = {
    note: Note
    onNoteClicked: (note: Note) => void
    onDeleteNoteClick: (note: Note) => void
}
export type DialogProps = {
    onDismiss : () => void 
    onSave: (note : Note) => void
    noteToEdit?: Note
}
export type TopBarProps = {
    notes : Note[],
    setNote : (input : Note[]) => void
}

export type NoteInput = {
    title: string,
    text: string
}

export type SignUpAndLoginModalProps = {
    onDismiss: () => void
    onSuccessful: (user : User) => void
}