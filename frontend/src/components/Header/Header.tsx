import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { headerStyles } from "../../styles/headerStyles";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUsers } from "../../redux/slice/userSlice";
const socket = io("http://localhost:5000");
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    socket.on("logout_user", (data) => {
      console.log(data);
      if (data === 200) {
        navigate("/");
      }
    });
  }, [navigate]);
  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      <AppBar position="absolute" color="inherit">
        <Toolbar>
          <Typography
            color="primary"
            variant="h6"
            component="div"
            sx={headerStyles.titleStyles}
          >
            Ramp Up Project
          </Typography>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            sx={headerStyles.buttonStyles}
            onClick={() => {
              dispatch(logoutUsers());
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
