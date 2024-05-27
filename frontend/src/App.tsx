import { useEffect, useState } from "react";
import "./App.css";
import { Note as NoteType } from "./models/note";
import TopBar from "./components/NavBar/TopBar";
import * as NotesApi from "./api/notes_api";
import { User } from "./models/user";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginComponent from "./pages/PrivacyPage";
import PageNotFound from "./pages/PageNotFound";
import NotesPage from "./pages/NotesPage";

function App() {
  const [notes, setNotes] = useState<NoteType[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchLoggedInUser = async () => {
      try {
        const user = await NotesApi.loginUserWithCookie();
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
    <BrowserRouter>
      <div>
        <TopBar
          LoggedInUser={loggedInUser}
          notes={notes}
          setNote={setNotes}
          setLoggedInUser={setLoggedInUser}
        />
        <Routes>
          <Route
          path="/"
          element={<NotesPage loggedInUser={loggedInUser} notes={notes} setNote={setNotes}/>} 
          />
          <Route 
          path="/login"
          element={<LoginComponent />} 
          />
          <Route 
          path="/*"
          element={<PageNotFound />} 
          />
        </Routes>
        
      </div>
    </BrowserRouter>
  );
}

export default App;
