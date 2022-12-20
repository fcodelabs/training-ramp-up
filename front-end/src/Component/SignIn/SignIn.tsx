import React from 'react'
import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

const SignIn = () => {
  const [email, setEmail] = React.useState('')

  const [password, setPassword] = React.useState('')

  const [showPassword, setShowPassword] = React.useState(false)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  return (
    <div
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
        onBlur={() => {
          // setIsTouched(true)
        }}
        //   error={isTouched && ranName === ''}
        //   helperText={isTouched && ranName === '' ? 'Required' : ''}
        id="reddit-input"
        style={{
          width: '420px',
          backgroundColor: 'white',
          marginBottom: '20px',
          marginTop: '30px'
        }}
      />
      <FormControl variant="outlined">
        <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
        <OutlinedInput
          id="outlined-adornment-password"
          type={showPassword ? 'text' : 'password'}
          label="Password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value)
          }}
          style={{
            width: '420px',
            backgroundColor: 'white',
            marginBottom: '30px'
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
      </FormControl>
      <Button
        variant="contained"
        // disabled={ranName === '' || ranName.length < 3}
        onClick={() => {
          //   dispatch(setNickname(ranName))
          //   navigate('/home')
        }}
        style={{
          borderRadius: '40px',
          padding: '8px 30px',
          fontSize: '.95em'
        }}
      >
        {' '}
        SIGN IN{' '}
      </Button>
    </div>
  )
}

export default SignIn
