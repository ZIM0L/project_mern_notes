import { Box, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import * as NotesApi from "../../api/notes_api";
import { Note as NoteType } from "../../models/note";
import NoteDialogPopUp from "../NoteDialogPopUp";
import Note from "../Notes";
import { NotesPageLoggedInViewProps } from "../../interfaces/PropsTypes";

const NotesPageLoggedInView = ({ notes, setNote}: NotesPageLoggedInViewProps) => {
 
  const [notesLoading, setNotesLoading] = useState(true);
  const [showNotesLoadingError, setShowNotesLoadingError] = useState(false);

  const [noteToEdit, setNoteToEdit] = useState<NoteType | null>(null);

  useEffect(() => {
    const loadNotes = async () => {
      try {
        setShowNotesLoadingError(false);
        setNotesLoading(true);
        const notes = await NotesApi.fetchDataGetReq();
        setNote(notes);
      } catch (error) {
        console.info(error);
        setShowNotesLoadingError(true);
      } finally {
        setNotesLoading(false);
      }
    };
    loadNotes();
  }, [setNote]);

  const deleteNote = async (note: NoteType) => {
    try {
      await NotesApi.deleteNote(note._id);
      setNote(notes.filter((existingNote) => existingNote._id !== note._id));
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
    <>
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
            setNote(
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
    </>
  );
};

export default NotesPageLoggedInView;
