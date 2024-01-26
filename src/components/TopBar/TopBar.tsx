import React from 'react';
import { styled } from '@mui/system';
import{Box,Typography,AppBar,Toolbar,Button} from '@mui/material';

const StyledTopBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: '#fff',
  color: '#000',
  boxShadow: 'none',
  backgroundPaper: '#fff',
  borderBottom: '1px solid #e0e0e0',
  margin: '0 0 84px 0',
  height: '52px',
  '& .MuiToolbar-root': {
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '52px',
    minHeight: '52px',
  },
  '& .MuiButton-root': {
    borderRadius: '4px',
    border: '1px solid rgba(33, 150, 243, 0.50)',
    fontSize: '14px',
    fontStyle: 'normal',
    fontWeight: 500,
    color: '#2196F3',
    '&:hover': {
      backgroundColor: '#fff',
    },
  },
  '& .MuiTypography-root': {
    fontSize:'24px',
    fontWeight: 600,
    color: '#1E88E5',
  },
}));

const TopBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <StyledTopBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Ramp Up Project
          </Typography>
          <Button variant='outlined' color="inherit">Login</Button>
        </Toolbar>
      </StyledTopBar>
    </Box>
  )
}

export default TopBar
