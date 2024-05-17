import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Notes";
import { Note as NotesType } from "./models/note";
import { Grid, CircularProgress, Typography } from "@mui/material";
import TopBar from "./components/NavBar/TopBar";
import * as NotesApi from "./api/notes_api";
import NoteDialogPopUp from "./components/NoteDialogPopUp";
import { auto } from "@popperjs/core";
import { Box } from "@mui/system";
// import NoteDialogPopUp from "./components/NoteDialogPopUp";

function App() {
  const [notes, setNotes] = useState<NotesType[]>([]);
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NotesType | null>(null);
  // const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchDataGetReq();
        setNotes(notes);
      } catch (error) {
        console.info(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, []);

  const deleteNote = async (note: NotesType) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNotes(notes.filter((existingNote) => existingNote._id !== note._id));
    } catch (error) {
      console.error(error);
    }
  };

  const notesGrid = (
    <Grid container spacing={1} padding={3} sx={{ marginTop: 2 }}>
      {notes.map((singleNote, key) => {
        return (
          <Grid item xs={12} sm={6} md={4} lg={3} key={key}>
            <Note
              note={singleNote}
              key={singleNote._id}
              onDeleteNoteClick={deleteNote}
              onNoteClicked={setNoteToEdit}
            />
          </Grid>
        );
      })}
    </Grid>
  );

  return (
    <div>
      <TopBar notes={notes} setNote={setNotes} />

      {notesLoading && (
        <Box sx={{ textAlign: "center", marginTop: 8 }}>
          <CircularProgress color="secondary" />
        </Box>
      )}
      {showNotesLoadingError && (
        <Typography sx={{ marginTop: 8, textAlign: "center" }}>
          Something went wrong. Refresh Page.
        </Typography>
      )}
      {!notesLoading && !showNotesLoadingError && (
        <>
          {notes.length > 0 ? (
            notesGrid
          ) : (
            <Typography sx={{ marginTop: 8, textAlign: "center" }}>
              There is no notes to display
            </Typography>
          )}
        </>
      )}
      {noteToEdit && (
        <NoteDialogPopUp
          noteToEdit={noteToEdit}
          onDismiss={() => setNoteToEdit(null)}
          onSave={(updatedNote) => {
            setNotes(
              notes.map((existingNode) =>
                existingNode._id === updatedNote._id
                  ? updatedNote
                  : existingNode
              )
            );
            setNoteToEdit(null);
          }}
        />
      )}
    </div>
  );
}

export default App;
