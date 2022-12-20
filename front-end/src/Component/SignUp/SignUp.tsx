import React, { useState } from 'react'
import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const SignUp = () => {
  const [userName, setUserName] = useState('')

  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [confirmPassword, setConfirmPassword] = useState('')

  const [userNameError, setUserNameError] = useState('')

  const [emailError, setEmailError] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [showPassword1, setShowPassword1] = useState(false)

  const [showPassword2, setShowPassword2] = useState(false)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const validate = () => {
    let valid: boolean = true
    const nameReg = /^([A-z\s]{3,30})$/
    const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/
    const validPw: boolean = password.length >= 8 && /[0-9]/.test(password)
    const validConfirmPw: boolean = !validPw || password === confirmPassword

    setUserNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    if (!nameReg.test(userName)) {
      setUserNameError('Enter valid name')
      valid = false
    }
    if (!emailReg.test(email)) {
      setEmailError('Enter valid email')
      valid = false
    }
    if (!validPw) {
      setPasswordError(
        'Enter valid password with at least 8 characters with digit/s'
      )
      valid = false
    }
    if (!validConfirmPw) {
      setConfirmPasswordError('Password does not match')
      valid = false
    }
    return valid
  }

  return (
    <Grid
      item
      xs={8}
      sm={7}
      md={5}
      lg={4}
      xl={3}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: '30px'
      }}
    >
      <TextField
        label="User Name"
        value={userName}
        onChange={(e) => {
          setUserName(e.target.value)
        }}
        error={userNameError !== ''}
        helperText={userNameError}
        id="reddit-input"
        style={{
          width: '420px',
          backgroundColor: 'white',
          marginBottom: '10px',
          marginTop: '30px'
        }}
      />
      <TextField
        label="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value)
        }}
        error={emailError !== ''}
        helperText={emailError}
        id="reddit-input"
        style={{
          width: '420px',
          backgroundColor: 'white',
          marginBottom: '10px'
        }}
      />
      <FormControl variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ color: passwordError !== '' ? '#d32f2f' : '' }}
        >
          Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword1 ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          error={passwordError !== ''}
          style={{
            width: '420px',
            backgroundColor: 'white'
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword1(!showPassword1)
                }}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword1 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error id="accountId-error">
          {passwordError}
        </FormHelperText>
      </FormControl>
      <FormControl variant="outlined">
        <InputLabel
          htmlFor="outlined-adornment-password"
          style={{ color: passwordError !== '' ? '#d32f2f' : '' }}
        >
          Confirm Password
        </InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword2 ? 'text' : 'password'}
          label="Password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value)
          }}
          error={confirmPasswordError !== ''}
          style={{
            width: '420px',
            backgroundColor: 'white',
            marginTop: '10px'
          }}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => {
                  setShowPassword2(!showPassword2)
                }}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword2 ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error id="accountId-error">
          {confirmPasswordError}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => {
          if (validate()) {
            //   dispatch(setNickname(ranName))
            //   navigate('/home')
          }
        }}
        style={{
          borderRadius: '40px',
          padding: '8px 30px',
          fontSize: '.95em',
          marginTop: '30px'
        }}
      >
        {' '}
        SIGN UP{' '}
      </Button>
    </Grid>
  )
}

export default SignUp
