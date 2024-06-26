import {
  Container,
  Divider,
  Box,
  Modal,
  Typography,
  Button,
} from "@mui/material";
import { DialogProps, NoteInput } from "../interfaces/PropsTypes";
import { useForm } from "react-hook-form";
import * as NotesApi from "../api/notes_api";
import { Note } from "../models/note";
import TextInputField from "./forms/TextInputField";

const NoteDialogPopUp = ({ noteToEdit, onDismiss, onSave }: DialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<NoteInput>({
    defaultValues: {
      title: noteToEdit?.title || "",
      text: noteToEdit?.text || "",
    },
  });

  const onSubmit = async (input: NoteInput) => {
    try {
      let noteResponse: Note;
      if (noteToEdit) {
        noteResponse = await NotesApi.updateNote(noteToEdit._id, input);
      } else {
        noteResponse = await NotesApi.createNote(input);
      }
      onSave(noteResponse);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal open onClose={onDismiss}>
      <Container
        sx={{
          marginTop: 5,
          maxWidth: "90%",
          paddingY: 1,
          bgcolor: "#fff",
          border: "1px solid black",
          borderRadius: 1,
          height: "fit-content",
          overflow: "auto",
          scrollBehavior: "smooth",
        }}
      >
        <Typography variant="h4" paddingY={2}>
          {noteToEdit ? "Edit note" : "Add note"}
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            marginBottom: 4,
          }}
        />
        <form id="addEditNoteForm" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextInputField
              name="title"
              label="Title"
              variant="standard"
              placeholder="Title"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.title}
            />
            <TextInputField
              name="text"
              label="Text"
              variant="outlined"
              placeholder="Text"
              multiline
              rows={3}
              register={register}
            />
            <Box
              sx={{
                alignSelf: "flex-end",
              }}
            >
              <Button
                type="submit"
                form={"addEditNoteForm"}
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  marginRight: 0,
                }}
              >
                {noteToEdit ? "Edit note" : "Create note"}
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Modal>
  );
};

export default NoteDialogPopUp;
