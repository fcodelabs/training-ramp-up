import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import { headerStyles } from "../../styles/headerStyles";

const Header = () => {
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
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
