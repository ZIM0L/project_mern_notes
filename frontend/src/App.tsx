import { useEffect, useState } from "react";
import "./App.css";
import Note from "./components/Notes";
import { Note as NotesType } from "./models/note";
import { AppBar, Box, Grid, Toolbar, Typography } from "@mui/material";

function App() {
  const [notes, setNotes] = useState<NotesType[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await fetch("http://localhost:5000/api/notes", {
          method: "GET",
        }).then(async (response) => {
          const notes = await response.json();
          setNotes(notes);
        });
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <div>
      <Box>
        <AppBar position="relative" sx={{
          bgcolor:'primary.dark'
        }}>
          <Toolbar>
            <Typography variant="h6">Basic notePad</Typography>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Grid container spacing={1} padding={3}>
        {notes.map((singleNote) => {
          return (
            <>
              <Grid item xs={12} sm={6} md={4}>
                <Note note={singleNote} key={singleNote._id} />
              </Grid>
            </>
          );
        })}
      </Grid>
    </div>
  );
}

export default App;
