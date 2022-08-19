import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { loggedActions } from '../store/loged-slice';

const ButtonAppBar = () => {
  const loggedState = useSelector((state: RootState) => state.log.isLoggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const logoutHandler = async () => {
    try {
      const response = await fetch('http://localhost:5400/logout', {
        credentials: 'include',
      });
      const responseData = await response.json();
      console.log(responseData.successMsg);
    } catch (error) {
      console.log(error);
    }
    localStorage.removeItem('accessToken');
    navigate('/login');
    dispatch(loggedActions.toggleState(false));
  };

  const signUpHandler = () => {
    navigate('/signup');
  };
  const loginHandler = () => {
    navigate('/login');
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
          {location.pathname === '/login' && (
            <Button color='inherit' onClick={signUpHandler}>
              Register
            </Button>
          )}
          {loggedState && (
            <Button color='inherit' onClick={logoutHandler}>
              Logout
            </Button>
          )}
          {location.pathname === '/signup' && (
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
