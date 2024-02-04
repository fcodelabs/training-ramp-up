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
import axios from 'axios'
import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

export default function CreatePassword() {
  const [showPassword, setShowPassword] = React.useState(false)
  const [password, setPassword] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const token = useParams();
  const navigate = useNavigate();

  

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

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
        console.log(token.token)
        console.log('http://localhost:4000/api/users/'+token.token,)
        axios
          .put('http://localhost:4000/api/users/'+token.token, 
          {
            password: password
          }
          )
          .then(({ data }) => {
            console.log('Password created', data)
            setConfirmPasswordError('')
            navigate("/login");
          })
          .catch((err) => {
            console.log(err)
          })
      }
    }
  }

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
              Create your password
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
                <InputLabel htmlFor="password">Password</InputLabel>
                <OutlinedInput
                  name="password"
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

              <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
                <InputLabel htmlFor="confirm-password">
                  Confirm Password
                </InputLabel>
                <OutlinedInput
                  name="confirm-password"
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
            </div>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button
            size="medium"
            variant="contained"
            fullWidth
            onClick={handleSubmit}
          >
            SUBMIT
          </Button>
        </CardActions>
      </Card>
    </div>
  )
}
