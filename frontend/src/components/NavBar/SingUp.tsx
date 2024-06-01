import { SignUpAndLoginModalProps } from "../../interfaces/PropsTypes";
import { useForm } from "react-hook-form";
import { SignUpWithCredentials } from "../../models/user";
import * as NotesApi from "../../api/notes_api";
import {
  Box,
  Button,
  Divider,
  Container,
  Modal,
  Typography,
} from "@mui/material";
import TextInputField from "../forms/TextInputField";

const SingUp = ({ onDismiss, onSuccessful }: SignUpAndLoginModalProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpWithCredentials>();

  const onSubmit = async (credentials: SignUpWithCredentials) => {
    try {
      const newUser = await NotesApi.signUp(credentials);
      if (newUser.username && newUser.username) {
        onSuccessful(newUser);        
      } else {
        alert("User already created with these inputs")
      }
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
          Sign Up
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            marginBottom: 4,
          }}
        />
        <form id="loginForm" onSubmit={handleSubmit(onSubmit)}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            <TextInputField
              name="username"
              label="Username"
              placeholder="username"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.username}
            />
            <TextInputField
              name="email"
              label="Email"
              placeholder="email"
              type="email"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.email}
            />
            <TextInputField
              name="password"
              label="Password"
              placeholder="password"
              type="password"
              register={register}
              registerOptions={{ required: "Required" }}
              error={errors.password}
            />

            <Box
              sx={{
                alignSelf: "flex-end",
              }}
            >
              <Button
                type="submit"
                form={"loginForm"}
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  marginRight: 0,
                }}
              >
                Sign up
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Modal>
  );
};

export default SingUp;
