import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Notes";
import { Note as NotesType } from "./models/note";
import { Button, Grid } from "@mui/material";
import TopBar from "./components/TopBar";
import  * as NotesApi  from "./api/notes_api";
import NoteDialogPopUp from "./components/NoteDialogPopUp";

function App() {
  const [notes, setNotes] = useState<NotesType[]>([]);

  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const notes = await NotesApi.fetchDataGetReq()
        setNotes(notes);
      } catch (error) {
        console.info(error)
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <TopBar />
      <Button onClick={() => setShowAddNoteDialog(true)} variant="contained">
          Add new Note
        </Button>
      <Grid container spacing={1} padding={3}>
        {notes.map((singleNote, key) => {
          return (
              <Grid item xs={12} sm={6} md={4} key={key}>
                <Note note={singleNote} key={singleNote._id} />
              </Grid>
          );
        })}
      </Grid>
      {showAddNoteDialog &&
      <NoteDialogPopUp onClose={() => setShowAddNoteDialog(false)} />
      }
    </div>
  );
}

export default App;
