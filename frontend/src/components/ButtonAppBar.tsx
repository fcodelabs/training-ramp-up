import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';

const ButtonAppBar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const refreshToken = localStorage.getItem('refreshToken');
  const accessToken = localStorage.getItem('accessToken');

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://localhost:5400/logout', {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('refreshToken')}`,
        },
      });
    } catch (error) {}
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/auth/login');
  };

  const signUpHandler = () => {
    navigate('/auth/signup');
  };
  const loginHandler = () => {
    navigate('/auth/login');
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          <IconButton
            size='large'
            edge='start'
            color='inherit'
            aria-label='menu'
            sx={{ mr: 2 }}
          ></IconButton>
          <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
            Ramp up Project
          </Typography>
          {location.pathname === '/auth/login' && (
            <Button color='inherit' onClick={signUpHandler}>
              Register
            </Button>
          )}
          {accessToken && (
            <Button color='inherit' onClick={logoutHandler}>
              Logout
            </Button>
          )}
          {location.pathname === '/auth/signup' && (
            <Button color='inherit' onClick={loginHandler}>
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default ButtonAppBar;
