import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import joi from 'joi'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { signInUser } from './userSlice'
import Alert from '@mui/material/Alert'
const theme = createTheme()

export default function SignIn() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [user, setUser] = useState({ email: '', password: '' })
  const schema: { [key: string]: any } = joi.object({
    email: joi
      .string()
      .email({ tlds: { allow: false } })
      .required(),
    password: joi
      .string()
      .min(8)
      .max(25)
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'password')
      .required(),
  })

  interface IErrors {
    [key: string]: string
  }
  const [errors, setErrors] = useState<IErrors>({})

  const handleSave = (event: React.ChangeEvent<HTMLTextAreaElement>): void => {
    const { name, value } = event.target
    const errorData = { ...errors }
    const errorMessage = validateProperty(event)
    if (errorMessage) {
      errorData[name] = errorMessage
    } else {
      delete errorData[name]
    }
    const UserData: any = { ...user }
    UserData[name] = value
    setUser(UserData)
    setErrors(errorData)
  }

  const validateProperty = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target
    const obj = { [name]: value }
    const subSchema = joi.object({
      [name]: schema.extract(name),
    })
    const result = subSchema.validate(obj)
    const { error } = result
    return error ? error.details[0].message : null
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = schema.validate(user)
    const { error } = result
    if (!error) {
      const usertoSign = { email: user.email, password: user.password }
      console.log(usertoSign)
      dispatch(signInUser(usertoSign))
    } else {
      const errorData: any = {}
      for (const item of error.details) {
        const name = item.path[0]
        const message = item.message
        errorData[name] = message
      }
      setErrors(errorData)
      console.log(errorData)
      return errorData
    }
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component='main' maxWidth='xs'>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          {/* {errors.email && (
            <Alert sx={{ mt: '1vw', mb: '1vw' }} severity='error'>
              Invalid Email
            </Alert>
          )} */}

          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign in
          </Typography>
          {(errors.password || errors.email) && (
            <Alert sx={{ mt: '1vw', mb: '1vw' }} severity='error'>
              Invalid Email or Password
            </Alert>
          )}
          <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin='normal'
              required
              fullWidth
              id='email'
              label='Email Address'
              name='email'
              autoComplete='email'
              onChange={handleSave}
              autoFocus
            />
            <TextField
              margin='normal'
              required
              fullWidth
              name='password'
              label='Password'
              type='password'
              id='password'
              onChange={handleSave}
              autoComplete='current-password'
            />

            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign In
            </Button>
            <Grid container>
              <Grid item>
                <Link href='/signup' variant='body2'>
                  {'Do not have an account? Sign Up'}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
