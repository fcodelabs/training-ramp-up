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
import { useLocation, useNavigate, useParams } from 'react-router-dom';

interface ISignupPageProps {}

const AuthPage = (props: ISignupPageProps) => {
  let initialAccessToken;
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();
  const [pageState, setPageState] = useState('Login');
  const [urlState, setUrlState] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [accessToken, setAccessToken] = useState<string | null>('');
  // const [refreshToken, setRefreshToken] = useState('');

  useEffect(() => {
    initialAccessToken = localStorage.getItem('accessToken');

    if (!initialAccessToken) {
      setAccessToken(initialAccessToken);
    }
  }, [initialAccessToken]);

  useEffect(() => {
    if (location.pathname === '/auth/signup') {
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
    try {
      const response = await fetch(`http://localhost:5400/${urlState}`, {
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

      if (!responsedata.access_token) {
        console.log(responsedata.message);
      } else {
        localStorage.setItem('accessToken', responsedata.access_token);
        localStorage.setItem('refreshToken', responsedata.refresh_token);

        if (localStorage.getItem('refreshToken')) navigate('/home');
      }
    } catch (error) {
      console.log(error);
    }
    setEmailInput('');
    setPasswordInput('');
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
