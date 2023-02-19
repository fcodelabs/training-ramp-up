import * as React from 'react'
import Avatar from '@mui/material/Avatar'
import joi from 'joi'
import Button from '@mui/material/Button'
import CssBaseline from '@mui/material/CssBaseline'
import TextField from '@mui/material/TextField'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Alert from '@mui/material/Alert'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { signUpUser } from '../SignIn/userSlice'

import { createTheme, ThemeProvider } from '@mui/material/styles'
import { useState } from 'react'

const theme = createTheme()
export default function SignUp() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  interface IUser {
    email: string
    password: string
    confPassword: string
  }

  const [user, setUser] = useState<IUser>({
    email: '',
    password: '',
    confPassword: '',
  })

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
    confPassword: joi
      .any()
      .equal(joi.ref('password'))
      .required()
      .label('Confirm password')
      .options({ messages: { 'any.only': '{{#label}} does not match' } }),
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
    if (name === 'confPassword') {
      const obj = { password: user.password, [name]: value }
      const subSchema = joi.object({
        [name]: schema.extract(name),
        password: schema.extract('password'),
      })
      const { error } = subSchema.validate(obj)
      return error ? error.details[0].message : null
    } else {
      const obj = { [name]: value }
      const subSchema = joi.object({
        [name]: schema.extract(name),
      })
      const result = subSchema.validate(obj)
      const { error } = result
      return error ? error.details[0].message : null
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const result = schema.validate(user)
    const { error } = result
    if (!error) {
      const usertoSign = { email: user.email, password: user.password }
      console.log(usertoSign)
      dispatch(signUpUser(usertoSign))
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
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            Sign up
          </Typography>
          <Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id='email'
                  label='Email Address'
                  name='email'
                  value={user.email}
                  onChange={handleSave}
                  autoComplete='email'
                />

                {errors.email && (
                  <Alert sx={{ mt: '1vw', mb: '1vw' }} severity='error'>
                    Invalid Email
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='password'
                  label='Password'
                  type='password'
                  id='password'
                  value={user.password}
                  onChange={handleSave}
                  autoComplete='new-password'
                />
                {errors.password && (
                  <Alert sx={{ mt: '1vw', mb: '1vw' }} severity='error'>
                    Invalid Password
                  </Alert>
                )}
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name='confPassword'
                  label='Confirm Password'
                  type='password'
                  id='confPassword'
                  value={user.confPassword}
                  onChange={handleSave}
                  autoComplete='conf-password'
                />
                {errors.confPassword && (
                  <Alert sx={{ mt: '1vw', mb: '1vw' }} severity='error'>
                    Password does not match
                  </Alert>
                )}
              </Grid>
            </Grid>
            <Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
              Sign Up
            </Button>
            <Grid container justifyContent='flex-end'>
              <Grid item>
                <Link href='./' variant='body2'>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  )
}
