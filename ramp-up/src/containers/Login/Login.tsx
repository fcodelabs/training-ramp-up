import {
  Card,
  CardContent,
  Typography,
  CardActions,
  Button,
  CardActionArea,
  FormControl,
  FormHelperText,
  InputLabel,
  OutlinedInput,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { getUserCredentials } from '../../redux/slices/authSlice'
import { RootState } from '../../redux/store/store'


export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const formData = { email, password }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginSuccess = useSelector((state: RootState) => state.auth.loginSuccess);
  const loginFailure = useSelector((state: RootState) => state.auth.error);
      

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
    const emailRegex = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/
    if (!emailRegex.test(event.target.value)) {
      setEmailError('Invalid email')
    } else {
      setEmailError('')
    }
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
    if (!event.target.value) {
      setPasswordError('Mandatory field is missing')
    } else {
      setPasswordError('')
    }
  }

  const handleSubmit = async () => {
    if (!email) {
      setEmailError('Mandatory field is missing')
    }
    if (!password) {
      setPasswordError('Mandatory field is missing')
    }
    if (email && password && !emailError && !passwordError) {

      try {
        const res = await dispatch(getUserCredentials(formData));
      
      } catch (error) {
        toast.error('An error occurred. Please try again.');
      }
      
      
    }
    
  }

  useEffect(() => {
    if (loginSuccess) {
      toast.success('Login successful');
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (loginFailure) {
      toast.error(loginFailure);
    }
  }, [loginSuccess, loginFailure]);
  

  return (
    <div
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Toaster />
      <Card sx={{ minWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Login
            </Typography>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="email">Email</InputLabel>
                <OutlinedInput
                  name="email"
                  id="email"
                  type="text"
                  value={email}
                  onChange={handleEmailChange}
                  error={Boolean(emailError)}
                  label="Email"
                />
                <FormHelperText>{emailError}</FormHelperText>
              </FormControl>

              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  name="password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  error={Boolean(passwordError)}
                  label="Password"
                />
                <FormHelperText>{passwordError}</FormHelperText>
              </FormControl>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            style={{ backgroundColor: '#2196F3', color: '#fff' }}
            fullWidth
            onClick={handleSubmit}
          >
            LOGIN
          </Button>
        </CardActions>
        <Typography align="center" color="textSecondary">
          Don't have an account?{' '}
          <Link
            to="/register"
            style={{ textDecoration: 'none', color: '#2196F3' }}
          >
            Register Now
          </Link>
        </Typography>
      </Card>
    </div>
  )
}
