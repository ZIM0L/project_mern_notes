import { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteType } from "./models/note";
import TopBar from "./components/NavBar/TopBar";
import * as NotesApi from "./api/notes_api";
import { User } from "./models/user";
import NotesPageLoggedInView from "./components/NotesView/NotesPageLoggedInView";
import NotesPageLoggedOutView from "./components/NotesView/NotesPageLoggedOutView";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.loginUserWithCookie();
        console.log(user);
        if (!user.username && !user.email) {
          setLoggedInUser(null);
        } else {
          setLoggedInUser(user);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchLoggedInUser();
  }, []);

  return (
    <div>
      <TopBar
        LoggedInUser={loggedInUser}
        notes={notes}
        setNote={setNotes}
        setLoggedInUser={setLoggedInUser}
      />
      {loggedInUser ? (
        <NotesPageLoggedInView notes={notes} setNote={setNotes} />
      ) : (
        <NotesPageLoggedOutView />
      )}
    </div>
  );
}

export default App;
