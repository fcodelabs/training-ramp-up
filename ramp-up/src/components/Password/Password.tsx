import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  TextField,
  CardActions,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  FormHelperText,
} from '@mui/material'
import React, { useState } from 'react'

export default function Password() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  const validatePassword = (password: string) => {
    const hasLowercase = /[a-z]/.test(password)
    const hasUppercase = /[A-Z]/.test(password)
    const hasNumber = /\d/.test(password)
    const hasSpecialChar = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/.test(
      password
    )
    const hasValidLength = password.length >= 8

    return (
      hasLowercase &&
      hasUppercase &&
      hasNumber &&
      hasSpecialChar &&
      hasValidLength
    )
  }
  const handleSubmit = () => {
    if (!validatePassword(password)) {
      setPasswordError('Weak password')
    } else {
      setPasswordError('')
      if (password !== confirmPassword) {
        setConfirmPasswordError('Please make sure your passwords match!')
      } else {
        setConfirmPasswordError('')
        // Handle successful password validation here
      }
    }
  }

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Create your password
          </Typography>
          {/* <div style={{ marginBottom: '20px' }}>
            <TextField
              id="password"
              label="password"
              variant="outlined"
              style={{ width: '500px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <TextField
              id="confirmpassword"
              label="Confirm Password"
              variant="outlined"
              style={{ width: '500px' }}
            />
          </div> */}

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="password">Password</InputLabel>
            <OutlinedInput
              id="password"
              type={showPassword ? 'text' : 'password'}
              onChange={handlePasswordChange}
              error={Boolean(passwordError)}
             
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
             <FormHelperText>{passwordError}</FormHelperText>
          </FormControl>

          <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
            <InputLabel htmlFor="confirmpassword">Confirm Password</InputLabel>
            <OutlinedInput
              id="confirm-password"
              type={showPassword ? 'text' : 'password'}
              onChange={handleConfirmPasswordChange}
              error={Boolean(confirmPasswordError)}
              
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
            <FormHelperText>{confirmPasswordError}</FormHelperText>
          </FormControl>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" onClick={handleSubmit}>
          SUBMIT
        </Button>
      </CardActions>
      <Typography variant="body2" color="text.secondary" align="center">
        Don't have an account?
        {/* <Link to="/register">Register now</Link> */}
      </Typography>
    </Card>
  )
}
