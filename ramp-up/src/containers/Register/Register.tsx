import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  FormControl,
  InputLabel,
  OutlinedInput,
  InputAdornment,
  IconButton,
  TextField,
  Button,
  Typography,
  CardActionArea,
  Card,
  CardActions,
  CardContent,
  Link,
  FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'

export default function Register() {

  
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');


   const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };
    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setName(event.target.value);
    };
  
    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(event.target.value);
    };
  
    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPassword(event.target.value);
    };
    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setConfirmPassword(event.target.value);
    };

    const handleSubmit = () => {
      // Reset errors
      setNameError('');
      setEmailError('');
      setPasswordError('');
      setConfirmPasswordError('');

      // Validate fields
    if (!name) {
      setNameError('Mandatory field is missing');
    }
    // if (!email) {
    //   setEmailError('Mandatory field is missing');
    // } else if (/* check if email is already registered */) {
    //   setEmailError('The entered email has already been registered');
    // }
    if (!password) {
      setPasswordError('Mandatory field is missing');
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Mandatory field is missing');
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Please make sure your passwords match!');
    }
     // If no errors, submit form
     if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      // Submit form
    }
  };
 

  return (

<div
      style={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={{ minWidth: 500 }}>
        <CardActionArea>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              Register
            </Typography>

            <div style={{ marginBottom: '10px' }}>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            style={{ width: '500px' }}
            //value={name}
            // onChange={(e) => setName(e.target.value)}
            // error={!!nameError}
            // helperText={nameError}
          />
        </div>
        <div style={{ marginBottom: '10px' }}>
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            style={{ width: '500px' }}
            // value={email}
            // onChange={handleEmailChange}
            // error={!!emailError}
            // helperText={emailError}
          />
        </div>

            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  name="password"
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  //onChange={handlePasswordChange}
                 // error={Boolean(passwordError)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                />
                {/* <FormHelperText>{passwordError}</FormHelperText> */}
              </FormControl>

              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  name="confirm-password"
                  id="confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  //onChange={handleConfirmPasswordChange}
                  //error={Boolean(confirmPasswordError)}
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                />
                {/* <FormHelperText>{confirmPasswordError}</FormHelperText> */}
              </FormControl>
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            fullWidth
           // onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </CardActions>
        <Typography align="center" color="textSecondary">
      Already have an account? <a href="/login"  style={{ textDecoration: 'none',color:"#2196F3" }}>Login</a>
            </Typography>
      </Card>
    </div>
  )
}
