import { NavBarLoggedInViewProps } from "../../interfaces/PropsTypes"
import { Typography } from "@mui/material";

const NavBarLoggedIn = ( {user} : NavBarLoggedInViewProps) => {


    return (
        <>
            <Typography sx={{
                padding:1,
                paddingX:2
            }}>
                Signed in as: {user?.username}
            </Typography>
        </>
    )
}

export default NavBarLoggedIn