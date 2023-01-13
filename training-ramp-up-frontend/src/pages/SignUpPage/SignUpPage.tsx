import {
    Grid,
    Typography,
    TextField,
    Container,
    Link,
    Button,
} from '@mui/material'
import React from 'react'
import '../signUpPage/signUpPage.css'
import { validate } from '../../utils/signUpPageValidations'
import { User } from '../../utils/interfaces'
import { addUser } from './slice/signUpPageSlice'
import { useAppDispatch, useAppSelector } from '../../hooks'
import { useNavigate } from 'react-router-dom'

export default function SignUpPage() {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const validSignUp = useAppSelector((state) => state.signUp.validSignUp)
    const [name, setName] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')

    const handleRegister = async () => {
        const user: User = {
            name: name,
            username: username,
            password: password,
        }
        if (validate(user)) {
            dispatch(addUser(user))
        }
    }

    React.useEffect(() => {
        if (validSignUp) {
            navigate('/')
        }
    })
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
                            Sign Up
                        </Typography>
                    </div>
                    <div className="txtContainer">
                        <TextField
                            fullWidth
                            value={name}
                            id="outlined-basic"
                            label="Name"
                            variant="outlined"
                            className="txt"
                            onChange={(e) => {
                                setName(e.target.value)
                            }}
                        />
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
                            onClick={handleRegister}
                        >
                            Register
                        </Button>
                    </div>
                    <div className="btnContainer">
                        <Typography
                            style={{ marginRight: '1vh' }}
                            variant="caption"
                            textAlign="center"
                        >
                            Already a User?
                        </Typography>
                        <Link href="/" variant="body2">
                            Sign In
                        </Link>
                    </div>
                </div>
            </Container>
        </Grid>
    )
}
