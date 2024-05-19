import { SignUpAndLoginModalProps } from "../../interfaces/PropsTypes"
import { LoginCredentials } from "../../models/user";
import { useForm } from "react-hook-form";
import * as NotesApi from "../../api/notes_api";
import { Modal, Box, Typography, Button, Divider, Container } from "@mui/material";
import TextInputField from "../forms/TextInputField";

const Login = ( { onDismiss, onSuccessful } : SignUpAndLoginModalProps) => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<LoginCredentials>();

    const onSubmit = async ( credentials : LoginCredentials) => {
        try {
            const user = await NotesApi.login(credentials)
            if (user.email && user.username) {
              onSuccessful(user)
            } else {
              alert("Wrong Login or Password !")
            }
        } catch (error) {
            console.error(error)
        }
    }
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
          Log in
        </Typography>
        <Divider
          variant="fullWidth"
          sx={{
            marginBottom: 4,
          }}
        />
        <form id="addUserForm" onSubmit={handleSubmit(onSubmit)}>
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
                form={"addUserForm"}
                variant="contained"
                disabled={isSubmitting}
                sx={{
                  marginRight: 0,
                }}
              >
                Login
              </Button>
            </Box>
          </Box>
        </form>
      </Container>
    </Modal>
  )
}

export default Login