import { Container, Typography } from "@mui/material";
import { NoteProps } from "../interfaces/PropsTypes";
import { MdDeleteForever } from "react-icons/md";

const Note = ({ note,onNoteClicked, onDeleteNoteClick }: NoteProps) => {
  const checkWhichBiggerDate = (): string => {
    const { createdAt, updatedAt } = note;
    return updatedAt > createdAt
      ? "Updated " + updatedAt
      : "Created " + updatedAt;
  };

  return (
    <div className=" cursor-pointer" title="Edit" onClick={()=> {
      onNoteClicked(note)
    }}>
      <Container
        sx={{
          paddingY: 1,
          bgcolor: "primary.light",
          border: "1px solid black",
          height: 150,
          overflow: "auto",
          scrollBehavior: "smooth",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
        }}
      >
        <Typography variant="h5" sx={{ fontWeight: "bold", display:"flex", justifyContent:"space-between", width:"100%" }}>
          {note.title}
        <MdDeleteForever className={"hover:cursor-auto"} onClick={(e)=> {
          e.stopPropagation();
          onDeleteNoteClick(note)
        }} />
        </Typography>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {note.text}
        </Typography>
      </Container >
      <Container
        sx={{
          paddingY: 0.5,
          bgcolor: "primary.main",
          border: "1px solid black",
          borderTop: "none",
        }}
      >
        <Typography variant="body2">{checkWhichBiggerDate()}</Typography>
      </Container>
    </div>
  );
};

export default Note;
