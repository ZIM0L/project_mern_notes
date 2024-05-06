import { Container, Typography } from "@mui/material";
import { NoteProps } from "../utils/PropsTypes";

const Note = ({ note }: NoteProps) => {

  const checkWhichBiggerDate = ( ) : string => {
    const { createdAt, updatedAt} = note;
    return updatedAt > createdAt ? "Updated " + updatedAt : "Created " + updatedAt;
  }    
    
  return (
    <>
      <Container
        sx={{
          paddingY: 1,
          bgcolor: "primary.main",
          border: "1px solid black",
          height: 150,
          overflow: "auto",
          scrollBehavior: "smooth",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {note.title}
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {note.text}
        </Typography>
      </Container>
      <Container
        sx={{
          paddingY:0.5,
          bgcolor: "primary.main",
          border: "1px solid black",
          borderTop: "none",
        }}
      >
        <Typography variant="body2">{checkWhichBiggerDate()}</Typography>
      </Container>
    </>
  );
};

export default Note;
