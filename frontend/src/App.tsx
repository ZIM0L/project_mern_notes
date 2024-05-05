import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";
import Button from '@mui/material/Button';

function App() {
  const [notes, setNotes] = useState<Note[]>([]);

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
  return(
  <div className=" text-white">
    {JSON.stringify(notes)}
    <Button className="text-red-500" variant="text" >Text</Button>
  </div>
  )
}

export default App;
