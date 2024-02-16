import { Box, Typography, Toolbar, Button } from "@mui/material";
import { StyledTopBar } from "../StyledComponents/StyledComponents";
import { useState } from "react";
import AlertDialog from "../AlertDialog/AlertDialog";
import { logOut } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";

const TopBar = () => {
  const dispatch = useDispatch();
  const [logOutConfirmOpen, setLogOutConfirmOpen] = useState(false);

  const handleLogoutclick = () => {
    setLogOutConfirmOpen(true);
  };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledTopBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ramp Up Project
          </Typography>
          <Button
            variant="outlined"
            color="inherit"
            onClick={handleLogoutclick}
          >
            LOG OUT
          </Button>
        </Toolbar>
      </StyledTopBar>
      <AlertDialog
        title="Are you sure you want to log out?"
        buttonText1="Dismiss"
        buttonText2="Confirm"
        isOpen={logOutConfirmOpen}
        handleClickFirstButton={() => {
          setLogOutConfirmOpen(false);
        }}
        handleClickSecondButton={() => {
          dispatch(logOut());
          setLogOutConfirmOpen(false);
        }}
        handleClose={() => setLogOutConfirmOpen(false)}
      />
    </Box>
  );
};

export default TopBar;
