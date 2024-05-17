import React from "react";
import { NavBarProps } from "../../interfaces/PropsTypes";
import { AppBar, Button } from "@mui/material";

const NavBar = ({
  loggedInUser,
  onLoginClicked,
  onLogoutpClicked,
  onSignUpClicked,
  onClickOpenPanel,
}: NavBarProps) => {
  return (
    <AppBar>
      <Button variant="contained" onClick={() => onClickOpenPanel(true)}>
        Open Panel
      </Button>
    </AppBar>
  );
};

export default NavBar;
