import  { useState } from 'react';
import { Drawer, ListItem, List, ListItemButton } from '@mui/material';
import { TopBarProps } from '../../interfaces/PropsTypes';
import NoteDialogPopUp from '../NoteDialogPopUp';
import SingUp from './SingUp';
import Login from './Login';
import NavBar from './NavBar';

const TopBar = ({ notes,setNote }: TopBarProps) => {
  const [showTopBar, setShowTopBar] = useState(false);
  const [showAddNoteDialog, setShowAddNoteDialog] = useState(false);

  const handleOpenDialog = () => {
    setShowAddNoteDialog(true);
    setShowTopBar(false);
  };

  const handleCloseDialog = () => {
    setShowAddNoteDialog(false);
  };

  return (
    <>
    <NavBar 
    loggedInUser={null}
    onLoginClicked={()=> {}}
    onLogoutpClicked={()=> {}}
    onSignUpClicked={()=> {}}
    onClickOpenPanel={setShowTopBar}/>
      {/* <AppBar >
        <Button variant='contained' onClick={() => setShowTopBar(true)}>Open Panel</Button>
      </AppBar> */}
      <Drawer open={showTopBar} onClose={() => setShowTopBar(false)} anchor='top'>
        <List>
          <ListItem>
            <ListItemButton onClick={handleOpenDialog}>Sign Up</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleOpenDialog}>Log in</ListItemButton>
          </ListItem>
          <ListItem>
            <ListItemButton onClick={handleOpenDialog}>Add Note</ListItemButton>
          </ListItem>

        </List>
      </Drawer>
      {
        false && <SingUp onDismiss={() => handleCloseDialog()} onSuccessful={() => {}}/>
      }
      {
        true && <Login onDismiss={() => handleCloseDialog()} onSuccessful={() => {}}/>
      }
      {showAddNoteDialog && (
        <NoteDialogPopUp
          onDismiss={handleCloseDialog}
          onSave={(newNote) => {
            setNote([...notes,newNote]);
            handleCloseDialog();
          }}
        />
      )}
    </>
  );
};

export default TopBar;