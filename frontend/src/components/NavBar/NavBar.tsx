import React from "react";
import { NavBarProps } from "../../interfaces/PropsTypes";
import { AppBar, Button } from "@mui/material";
import NavBarLoggedIn from "./LoggedInView";
import NavBarLoggedOut from "./LoggedOutView";

const NavBar = ({
  loggedInUser,
  onLoginClicked,
  onLogoutSuccessful,
  onSignUpClicked,
  onClickOpenPanel,
}: NavBarProps) => {
  return (
    <AppBar sx={{
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 1,
      position: "relative"
    }}>
      <Button variant="contained" onClick={() => onClickOpenPanel(true)}>
        Open Panel
      </Button>
      {loggedInUser ? 
      <NavBarLoggedIn user={loggedInUser} onLogoutSuccessful={onLogoutSuccessful}/>
      :
      <NavBarLoggedOut onLoginClicked={onLoginClicked} onSignUpClicked={onSignUpClicked}/>
      }
    </AppBar>
  );
};

export default NavBar;
