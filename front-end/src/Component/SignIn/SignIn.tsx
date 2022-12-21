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
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
  const [email, setEmail] = useState('')

  const [password, setPassword] = useState('')

  const [emailError, setEmailError] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const [showPassword, setShowPassword] = useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const navigate = useNavigate()

  const validate = () => {
    let valid: boolean = true
    const emailReg = /^([\w-.]+@([\w-]+\.)+[\w-]{2,4})$/
    const validPw: boolean = password.length >= 8 && /[0-9]/.test(password)

    setEmailError('')
    setPasswordError('')

    if (!emailReg.test(email)) {
      setEmailError('Enter valid email')
      valid = false
    }
    if (!validPw) {
      setPasswordError('Enter valid password')
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
          marginBottom: '20px',
          marginTop: '30px'
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
          type={showPassword ? 'text' : 'password'}
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
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          }
        />
        <FormHelperText error id="accountId-error">
          {passwordError}
        </FormHelperText>
      </FormControl>
      <Button
        variant="contained"
        onClick={() => {
          console.log(validate())

          if (validate()) {
            //   dispatch(setNickname(ranName))
            navigate('/home')
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
        SIGN IN{' '}
      </Button>
    </Grid>
  )
}

export default SignIn
