import  { useState } from 'react';
import { Drawer, ListItem, List, ListItemButton, Button, AppBar } from '@mui/material';
import { TopBarProps } from '../interfaces/PropsTypes';
import NoteDialogPopUp from './NoteDialogPopUp';

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
      <AppBar >
        <Button variant='contained' onClick={() => setShowTopBar(true)}>Open drawer</Button>

      </AppBar>
      <Drawer open={showTopBar} onClose={() => setShowTopBar(false)} anchor='top'>
        <List>
          <ListItem>
            <ListItemButton onClick={handleOpenDialog}>Add Note</ListItemButton>
          </ListItem>

        </List>
      </Drawer>
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
