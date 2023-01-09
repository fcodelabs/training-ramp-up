import { Grid, Typography, TextField, Container, Link } from '@mui/material'
import React from 'react'
import '../SignInPage/SignInPage.css'
import Button from '@mui/material/Button'
import { logIn } from './slice/SignInPageSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { validate } from '../../utils/signUpPageValidations'
import { useNavigate } from 'react-router-dom'
import { User } from '../../utils/interfaces'

export default function SignUpPage() {
    const navigate=useNavigate()
    const dispatch = useAppDispatch()
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleLogIn = async() => {
        const user:User = {
            username: username,
            password: password,
        }
        if (validate(user)) {
            dispatch(logIn({user,navigate}))
            navigate('/home')
        }
    }


    return (
        <Grid className="containerGrid">
            <Container maxWidth="xs" className="container">
                <div>
                    <div>
                        <Typography
                            variant="h4"
                            color="#1976d2"
                            textAlign="center"
                        >
                            Sign In
                        </Typography>
                    </div>
                    <div className="txtContainer">
                        <TextField
                            fullWidth
                            value={username}
                            id="outlined-basic"
                            label="Username"
                            variant="outlined"
                            className="txt"
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                        />

                        <TextField
                            fullWidth
                            value={password}
                            id="outlined-basic"
                            label="Password"
                            variant="outlined"
                            className="txt"
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                        />
                    </div>

                    <div className="btnContainer">
                        <Button
                            fullWidth
                            variant="contained"
                            className="btn"
                            onClick={handleLogIn}
                        >
                            Sign In
                        </Button>
                    </div>
                    <div className="btnContainer">
                        <Typography
                            style={{ marginRight: '1vh' }}
                            variant="caption"
                            textAlign="center"
                        >
                            Not a user yet?
                        </Typography>
                        <Link href="/signUp" variant="body2">
                            Sign Up
                        </Link>
                    </div>
                </div>
            </Container>
        </Grid>
    )
}
