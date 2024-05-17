import { NavBarLoggedInViewProps } from "../../interfaces/PropsTypes"
import * as NotesApi from "../../api/notes_api";
import { Button, Typography } from "@mui/material";

const NavBarLoggedIn = ( {user, onLogoutSuccessful} : NavBarLoggedInViewProps) => {

    const logout = async (  ) => {
        try {
            await NotesApi.logout()
            onLogoutSuccessful()
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <>
            <Typography>
                Signed in as: {user.username}
            </Typography>
            <Button onClick={logout}></Button>
        </>
    )
}

export default NavBarLoggedIn