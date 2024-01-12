import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <Box sx={{ flexGrow: 1, margin: 0 }}>
      <AppBar position="absolute" color="inherit">
        <Toolbar>
          <Typography
            color="primary"
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              fontFamily: "Roboto",
              fontWeight: 590,
              color: "rgba(30, 136, 229, 1)",
            }}
          >
            Ramp Up Project
          </Typography>
          <Button
            size="small"
            color="primary"
            variant="outlined"
            sx={{
              fontFamily: "Roboto",
              fontWeight: 600,
              color: "rgba(30, 136, 229, 1)",
            }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Header;
