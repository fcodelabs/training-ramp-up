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
  FormHelperText,
  Modal,
  Paper,
} from '@mui/material'
import React, { useEffect, useState } from 'react'
import { getUserDetails } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../redux/store/store'
import { Toaster, toast } from 'react-hot-toast'
import DialogBox from '../../components/DialogBox/DialogBox'

export default function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [confirmPasswordError, setConfirmPasswordError] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false) 


  const formData = {
    name,
    email,
    password,
  }
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const loginSuccess = useSelector(
    (state: RootState) => state.auth.loginSuccess
  )
  const loginFailure = useSelector((state: RootState) => state.auth.error)

  const handleClickShowPassword = () => setShowPassword((show) => !show)

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault()
  }
  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value)
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value)
  }
  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(event.target.value)
  }

  const handleSubmit = async () => {
    // Reset errors
    setNameError('')
    setEmailError('')
    setPasswordError('')
    setConfirmPasswordError('')

    // Validate fields
    if (!name) {
      setNameError('Mandatory field is missing')
    }
    if (!email) {
      setEmailError('Mandatory field is missing')
    }
    if (!password) {
      setPasswordError('Mandatory field is missing')
    }
    if (!confirmPassword) {
      setConfirmPasswordError('Mandatory field is missing')
    } else if (password !== confirmPassword) {
      setConfirmPasswordError('Please make sure your passwords match!')
    }

    if (!nameError && !emailError && !passwordError && !confirmPasswordError) {
      try {
        const res = await dispatch(getUserDetails(formData))
        setShowSuccessModal(true)
      } catch (error) {
        toast.error('An error occurred. Please try again.')
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
              Register
            </Typography>

            <div style={{ marginBottom: '10px' }}>
              <TextField
                id="name"
                label="Name"
                variant="outlined"
                style={{ width: '500px' }}
                value={name}
                onChange={(e) => setName(e.target.value)}
                error={!!nameError}
                helperText={nameError}
              />
            </div>
            <div style={{ marginBottom: '10px' }}>
              <TextField
                id="email"
                label="Email"
                variant="outlined"
                style={{ width: '500px' }}
                value={email}
                onChange={handleEmailChange}
                error={!!emailError}
                helperText={emailError}
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
        <Typography align="center" color="textSecondary">
          Already have an account?{' '}
          <a href="/login" style={{ textDecoration: 'none', color: '#2196F3' }}>
            Login
          </a>
        </Typography>
      </Card>
      <Modal
        open={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        aria-labelledby="success-modal-title"
        aria-describedby="success-modal-description"
      >
       <Paper
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '12px',
          }}
        >
          <DialogBox
            message="Your account has been successfully created."
            primaryButton={{
              text: 'OK',
              onClick: () => {
                setShowSuccessModal(false)
                navigate("/login")
              },
            }}
            primaryOption="OK"
          />
        </Paper>
        </Modal>

    </div>
  )
}
