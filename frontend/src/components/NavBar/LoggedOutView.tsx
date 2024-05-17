import { Button } from "@mui/material"
import { NavBarLoggedOutViewProps } from "../../interfaces/PropsTypes"

const LoggedOutView = ({ onLoginClicked, onSignUpClicked  } : NavBarLoggedOutViewProps) => {
  return (
    <>
        <Button onClick={onSignUpClicked}>Sign Up</Button>
        <Button onClick={onLoginClicked}>Log in</Button>
    </>
  )
}

export default LoggedOutView