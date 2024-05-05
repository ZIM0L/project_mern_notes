import { useEffect, useState } from "react";
import "./App.css";
import { Note } from "./models/note";

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
    fetchData()
  }, [notes]);
  return(
  <div className=" text-white">
    {JSON.stringify(notes)}
  </div>
  )
}

export default App;
