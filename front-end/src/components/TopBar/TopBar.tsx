import { Box, Typography, Toolbar, Button } from "@mui/material";
import { StyledTopBar } from "../StyledComponents/StyledComponents";

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledTopBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ramp Up Project
          </Typography>
          <Button variant="outlined" color="inherit">
            Login
          </Button>
        </Toolbar>
      </StyledTopBar>
    </Box>
  );
};

export default TopBar;
