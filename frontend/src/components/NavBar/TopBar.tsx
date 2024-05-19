import { useState } from "react";
import {
  AppBar,
  Button,
  Drawer,
  ListItem,
  List,
  ListItemButton,
} from "@mui/material";
import { TopBarProps } from "../../interfaces/PropsTypes";
import NoteDialogPopUp from "../NoteDialogPopUp";
import SingUp from "./SingUp";
import Login from "./Login";
import NavBarLoggedIn from "./LoggedInView";
import * as NotesApi from "../../api/notes_api";

const TopBar = ({
  LoggedInUser,
  notes,
  setNote,
  setLoggedInUser,
}: TopBarProps) => {
  const [showTopBar, setShowTopBar] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [showSignInDialog, setSignInDialog] = useState(false);

  const handleAddNoteDialog = () => {
    setShowAddNoteDialog(!showAddNoteDialog);
    closeTopBar();
  };
  const handleSignInDialog = () => {
    setSignInDialog(true);
    closeTopBar();
  };
  const handleLoginDialog = () => {
    setShowLoginDialog(true);
    closeTopBar();
  };

  const closeTopBar = () => {
    setShowTopBar(false);
  };

  const handleLogOut = async () => {
    try {
      await NotesApi.logout();
      closeTopBar();
      setLoggedInUser(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* <NavBar 
    loggedInUser={null}
    onLoginClicked={()=> {}}
    onLogoutSuccessful={()=> {}}
    onSignUpClicked={()=> {}}
    onClickOpenPanel={setShowTopBar}/> */}
      <AppBar
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ flexGrow: 1 }}
          variant="contained"
          onClick={() => setShowTopBar(true)}
        >
          Open Panel
        </Button>
        {LoggedInUser && <NavBarLoggedIn user={LoggedInUser} />}
      </AppBar>

      <Drawer
        open={showTopBar}
        onClose={() => setShowTopBar(false)}
        anchor="top"
      >
        <List>
          {LoggedInUser ? (
            <>
              <ListItem>
                <ListItemButton onClick={handleAddNoteDialog}>
                  Add Note
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleLogOut}>Log Out</ListItemButton>
              </ListItem>
            </>
          ) : (
            <>
              <ListItem>
                <ListItemButton onClick={handleSignInDialog}>
                  Sign Up
                </ListItemButton>
              </ListItem>
              <ListItem>
                <ListItemButton onClick={handleLoginDialog}>
                  Log in
                </ListItemButton>
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      {showSignInDialog && (
        <SingUp
          onDismiss={() => setSignInDialog(!showSignInDialog)}
          onSuccessful={(user) => {
            setSignInDialog(!showSignInDialog);
            setLoggedInUser(user);
          }}
        />
      )}
      {showLoginDialog && (
        <Login
          onDismiss={() => setShowLoginDialog(!showLoginDialog)}
          onSuccessful={(user) => {
            setShowLoginDialog(!showLoginDialog);
            setLoggedInUser(user);
          }}
        />
      )}
      {showAddNoteDialog && (
        <NoteDialogPopUp
          onDismiss={handleAddNoteDialog}
          onSave={(newNote) => {
            setNote([...notes, newNote]);
            handleAddNoteDialog();
          }}
        />
      )}
    </>
  );
};

export default TopBar;
