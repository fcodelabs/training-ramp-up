/* eslint-disable object-shorthand */
import bg from './signUpBg.jpg'
import React, { useEffect, useState } from 'react'
import {
  Button,
  TextField,
  OutlinedInput,
  InputAdornment,
  IconButton,
  InputLabel,
  FormControl,
  FormHelperText,
  Grid,
  Select,
  MenuItem
} from '@mui/material'
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux/es/exports'
import { addUser, setAddStatus } from '../../slices/UserSlice'
import { User } from '../../utils/interface'

const SignUp: React.FC = () => {
  const isAdd = useSelector((state: any) => state.user.isAdd)

  const [userName, setUserName] = useState('Risi')

  const [email, setEmail] = useState('risi@gmail.com')

  const [password, setPassword] = useState('risi123.')

  const [confirmPassword, setConfirmPassword] = useState('risi123.')

  const [role, setRole] = useState('Guest')

  const [userNameError, setUserNameError] = useState('')

  const [emailError, setEmailError] = useState('')

  const [passwordError, setPasswordError] = useState('')

  const [confirmPasswordError, setConfirmPasswordError] = useState('')

  const [roleError, setRoleError] = useState('')

  const [showPassword1, setShowPassword1] = useState(false)

  const [showPassword2, setShowPassword2] = useState(false)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }

  const dispatch = useDispatch()

  const navigate = useNavigate()

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
    if (role === '') {
      setRoleError('Select your role')
      valid = false
    }
    return valid
  }

  useEffect(() => {
    if (isAdd === true) {
      navigate('/')
      dispatch(setAddStatus(false))
    }
  }, [isAdd])

  return (
    <Grid
      container
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover'
      }}
    >
      <Grid
        item
        xs={9}
        sm={8}
        md={6}
        lg={5}
        xl={4}
        style={{
          backgroundColor: 'white',
          minHeight: '370px',
          borderRadius: '15px',
          boxShadow: '1px 1px 5px 2px rgba(0, 0, 0, 0.16)',
          padding: '25px 15px'
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <div
            className="signin-form-title"
            style={{
              color: '#039BE5',
              fontSize: '2.125rem',
              fontWeight: '400',
              lineHeight: '1.17',
              paddingBottom: '30px'
            }}
          >
            {' '}
            Sign Up{' '}
          </div>
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
              id="sign-up-name"
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
              id="sign-up-email"
              style={{
                width: '420px',
                backgroundColor: 'white',
                marginBottom: '10px'
              }}
            />
            <FormControl>
              <InputLabel
                htmlFor="outlined-role"
                style={{ color: roleError !== '' ? '#d32f2f' : '' }}
              >
                Role
              </InputLabel>
              <Select
                labelId="select-label"
                id="simple-select"
                value={role}
                label="Role"
                onChange={(e) => {
                  setRole(e.target.value)
                }}
                error={roleError !== ''}
                style={{
                  width: '420px',
                  backgroundColor: 'white'
                }}
              >
                <MenuItem value={'Admin'}>Admin</MenuItem>
                <MenuItem value={'Guest'}>Guest</MenuItem>
              </Select>
              <FormHelperText error id="role-error">
                {roleError}
              </FormHelperText>
            </FormControl>
            <FormControl variant="outlined">
              <InputLabel
                htmlFor="outlined-adornment-password"
                style={{ color: passwordError !== '' ? '#d32f2f' : '' }}
              >
                Password
              </InputLabel>
              <OutlinedInput
                id="sign-up-pw"
                type={showPassword1 ? 'text' : 'password'}
                label="Password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
                error={passwordError !== ''}
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
                htmlFor="outlined-adornment-password2"
                style={{ color: confirmPasswordError !== '' ? '#d32f2f' : '' }}
              >
                Confirm Password
              </InputLabel>
              <OutlinedInput
                id="sign-up-pw2"
                type={showPassword2 ? 'text' : 'password'}
                label="Confirm Password"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                }}
                error={confirmPasswordError !== ''}
                style={{
                  width: '420px',
                  backgroundColor: 'white'
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
                  const newUser: User = {
                    userName: userName,
                    email: email,
                    password: password,
                    confirmPassword: confirmPassword,
                    role: role
                  }
                  dispatch(addUser(newUser))
                  if (isAdd === true) {
                    navigate('/')
                  }
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
          <Button
            size="small"
            onClick={() => {
              navigate('/')
            }}
          >
            <u>Already have an Account ?</u>
          </Button>
        </div>
      </Grid>
    </Grid>
  )
}

export default SignUp
