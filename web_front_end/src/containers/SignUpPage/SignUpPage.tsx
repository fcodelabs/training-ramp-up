import React, { useState } from "react";
import { Button, Card, Container, TextField, Typography } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAppDispatch } from "../../redux/store";
import { userDataActions } from "../../redux/user/userSlice";
import { useNavigate } from "react-router-dom";
import ERoleEnum from "../../enum/roleEnum";
import { ROUTE_SIGNIN } from "../../util/routes";

export default function SignUpPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    interface IUserData {
        userId: number;
        userName: string;
        userEmail: string;
        userPassword: string;
        role: string;
    }

    const handleSignUp = () => {
        const userData: IUserData = {
            userId: 0,
            userName: username,
            userEmail: email,
            userPassword: password,
            role: ERoleEnum.USER,
        };
        dispatch(userDataActions.updateUserData(userData));
    };
    
    return (
        <Container
            maxWidth="sm"
            sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "100vh",
            }}
        >
            <Card
                variant="outlined"
                sx={{
                    margin: "25px",
                    borderRadius: "30px",
                    backgroundColor: "#ECF0F1",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                    padding: "1rem",
                    width: "60%",
                }}
            >
                <Typography
                    variant="h3"
                    align="center"
                    sx={{
                        fontFamily: "Ubuntu, sans-serif",
                        color: "#01ACDC",
                        marginBottom: "30px",
                        fontWeight: "600",
                    }}
                >
                    Sign Up
                </Typography>

                <form>
                    <TextField
                        size="small"
                        label="User Name"
                        id="outlined-basic"
                        variant="outlined"
                        fullWidth
                        required
                        sx={{ mb: 2 }}
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <TextField
                        size="small"
                        label="User Email"
                        id="outlined-basic"
                        variant="outlined"
                        type="email"
                        fullWidth
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        size="small"
                        label="User Password"
                        id="outlined-basic"
                        variant="outlined"
                        type="password"
                        fullWidth
                        required
                        margin="normal"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        size="small"
                        variant="contained"
                        fullWidth
                        sx={{
                            borderRadius: "10px",
                            mt: 1,
                            backgroundColor: "#01ACDC",
                            color: "#fff",
                            "&:hover": { backgroundColor: "#01ACDC" },
                            gap: "10px",
                            fontFamily: "Ubuntu, sans-serif",
                        }}
                        onClick={handleSignUp}
                        disabled={username === "" || email === "" || password === ""}
                    >
                        Sign Up
                        <ArrowForwardIcon />
                    </Button>
                    <Typography
                        align="center"
                        sx={{
                            fontFamily: "Ubuntu, sans-serif",
                            mt: "1rem",
                            fontWeight: "600",
                            color: "gray",
                        }}
                    >
                        Have an account?
                    </Typography>
                    <Typography
                        align="center"
                        sx={{
                            color: "#01ACDC",
                            fontFamily: "Ubuntu, sans-serif",
                            fontWeight: "600",
                            cursor: "pointer",
                        }}
                        onClick={() => {
                            navigate(ROUTE_SIGNIN);
                        }}
                    >
                        Sign In
                    </Typography>
                </form>
            </Card>
        </Container>
    );
}
