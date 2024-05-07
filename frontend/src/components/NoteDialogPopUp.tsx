import {
  Container,
  Divider,
  Button,
  FormControl,
  FormGroup,
  FormLabel,
  Input,
  InputLabel,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { DialogProps } from "../interfaces/PropsTypes";

const NoteDialogPopUp = ({ onClose }: DialogProps) => {

    const [input1, setInput1] = useState('');
    const [input2, setInput2] = useState('');
  
    const handleChangeInput1 = (event : HTMLInputElement) => {
    console.log(event.target.value)
    setInput1(event.target.value);
    };
  
    const handleChangeInput2 = (event) => {
      setInput2(event.target.value);
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // Do something with the form data
      console.log('Input 1:', input1);
      console.log('Input 2:', input2);
    };

  return (
    <Modal open onClose={onClose}>
      <Container
        sx={{
          marginTop:5,
          maxWidth: "90%",
          paddingY: 1,
          bgcolor: "primary.main",
          border: "1px solid black",
          borderRadius:2,
          height: "fit-content",
          overflow: "auto",
          scrollBehavior: "smooth",
        
         
        }}
      >
        <Typography variant="h5">
            Add Note
        </Typography>
        <Divider variant="fullWidth"/>
        <form onSubmit={handleSubmit}>
      <div>
        <Typography variant="body1">Label 1:</Typography>
        <Input
          value={input1}
          onChange={() => handleChangeInput1}
        />
      </div>
      <div>
        <Typography variant="body1">Label 2:</Typography>
        <Input
  
          value={input2}
          onChange={() => handleChangeInput2}
        />
      </div>
      <div>
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </div>
    </form>
      </Container>
    </Modal>
  );
};

export default NoteDialogPopUp;
