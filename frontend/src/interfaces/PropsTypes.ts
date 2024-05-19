import { Note } from "../models/note";
import { User } from "../models/user";

export type NoteProps = {
  note: Note;
  onNoteClicked: (note: Note) => void;
  onDeleteNoteClick: (note: Note) => void;
};
export type DialogProps = {
  onDismiss: () => void;
  onSave: (note: Note) => void;
  noteToEdit?: Note;
};
export type TopBarProps = {
  LoggedInUser: User | null
  notes: Note[];
  setNote: (input: Note[]) => void;
  setLoggedInUser: ( isLogged : User | null) => void
};

export type NoteInput = {
  title: string;
  text: string;
};

export type SignUpAndLoginModalProps = {
  onDismiss: () => void;
  onSuccessful: (user: User) => void;
};

export type NotesPageLoggedInViewProps = {
  notes: Note[];
  setNote: (input: Note[]) => void;
}


//not used rn
export type NavBarProps = {
  loggedInUser: User | null;
  onClickOpenPanel: (state: boolean) => void;
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
  onLogoutSuccessful: () => void;
};

export type NavBarLoggedInViewProps = {
  user: User | null;
};

export type NavBarLoggedOutViewProps = {
  onSignUpClicked: () => void;
  onLoginClicked: () => void;
};
