import {
  Button,
  Card,
  CardActions,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { idText } from 'typescript';
import { loggedActions } from '../store/loged-slice';

interface ISignupPageProps {}

const AuthPage = (props: ISignupPageProps) => {
  const navigate = useNavigate();
  const params = useParams();
  const dispatch = useDispatch();
  const location = useLocation();
  const [pageState, setPageState] = useState('Login');
  const [urlState, setUrlState] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');

  useEffect(() => {
    if (location.pathname === '/signup') {
      setPageState('SignUp');
      setUrlState('signup');
    } else {
      setUrlState('login');
      setPageState('Login');
    }
  }, [location]);

  const emailHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.target.value;
    setEmailInput(email);
  };

  const passwordHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const password = event.target.value;
    setPasswordInput(password);
  };

  const onSubmitHandler = async () => {
    const isEmailValid = /\S+@\S+\.\S+/.test(emailInput);
    const isPasswordValid = passwordInput.length > 1;

    if (isEmailValid && isPasswordValid) {
      try {
        /* const response = await fetch(`http://localhost:5400/${urlState}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
          }),
        });
        const responsedata = await response.json();

        if (responsedata.access_token) {
          localStorage.setItem('refreshToken', responsedata.refresh_token);
          dispatch(loggedActions.storeAccessToken(responsedata.access_token));
          dispatch(loggedActions.toggleState(true));
          navigate('/home');
        } else {
          console.log(responsedata.message);
        } */

        // cookies method
        const response = await fetch(`http://localhost:5400/${urlState}`, {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: emailInput,
            password: passwordInput,
          }),
        });
        const responsedata = await response.json();

        if (responsedata.access_token) {
          localStorage.setItem('accessToken', responsedata.access_token);
          dispatch(loggedActions.toggleState(true));
          navigate('/home');
        } else {
          console.log(responsedata.message);
        }
      } catch (error) {
        console.log(error);
      }
      setEmailInput('');
      setPasswordInput('');
    } else {
      console.log('Email or Password Invalid');
      setEmailInput('');
      setPasswordInput('');
    }
  };
  return (
    <Grid
      container
      item
      sx={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    >
      <Grid item md={5} xs={11} sx={{ m: 'auto' }}>
        <Card
          sx={{
            borderRadius: 3,
            minHeight: 350,
          }}
        >
          <CardContent>
            <Typography sx={{ my: 3, textAlign: 'center' }}>
              {pageState} Page
            </Typography>
            <Grid item md={6} sx={{ mx: 'auto' }}>
              <FormControl fullWidth sx={{ mt: 2 }}>
                <InputLabel htmlFor='title'>Email</InputLabel>
                <OutlinedInput
                  type='text'
                  value={emailInput}
                  onChange={emailHandler}
                  id='email'
                  label='Email'
                  sx={{ borderRadius: 3 }}
                  placeholder='Email'
                  required
                />
              </FormControl>
              <FormControl fullWidth sx={{ mt: 3 }}>
                <InputLabel htmlFor='title'>Password</InputLabel>
                <OutlinedInput
                  type='password'
                  value={passwordInput}
                  onChange={passwordHandler}
                  id='password'
                  label='Password'
                  sx={{ borderRadius: 3 }}
                  placeholder='Password'
                  required
                />
              </FormControl>
            </Grid>
          </CardContent>
          <CardActions>
            <Button
              onClick={onSubmitHandler}
              variant='contained'
              sx={{ mx: 'auto' }}
            >
              {pageState}
            </Button>
          </CardActions>
        </Card>
      </Grid>
    </Grid>
  );
};

export default AuthPage;
