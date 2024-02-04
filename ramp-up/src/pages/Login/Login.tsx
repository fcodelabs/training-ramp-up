import React from "react";
import { Card, 
         Box, 
         FormControl, 
         InputLabel, 
         OutlinedInput,
         FormHelperText,
        } from "@mui/material";
import { StyledButton } from "../home/AddUser/AddUser";
import { loginRequest } from "../../redux/slices/userSlice";
import { useDispatch } from "react-redux";
import { useContext } from "react";
import { SocketContext } from "../../SocketContext";
import { useNavigate } from 'react-router-dom';

const styles = {
    box:{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
    },
    cardTitle:{
        padding: "16px 16px 16px 24px", 
        lineHeight: "32px",
        fontWeight: 400,
        fontSize: "24px",
        fontFamily: "Roboto,sans-serif",
    },
    cardDiv:{
        display: "flex",
        flexDirection: "column" as "column",
        gap: "16px",
        padding: "16px",
    },
    registerText:{
        fontFamily: "Roboto,sans-serif",
        fontSize: "16px",
        fontWeight: 400,
        lineHeight: "24px",
        LetterSpacing: "0.15px",
        display: "flex",
        justifyContent: "center",
    },
    registerLink:{
        color: "#2196F3",
        textDecoration: "none",
        fontFamily: "Roboto,sans-serif",
        fontSize: "16px",
        fontWeight: 600,
        lineHeight: "24px",
        LetterSpacing: "0.15px",
        paddingLeft: "4px",

    }
}

export function Login() {
    const navigate = useNavigate();

    const dispatch = useDispatch();  

    const socket = useContext(SocketContext);

    socket?.on("user-logging",(success) =>{
        if(!success){
            setIsInValidLogin(true);
        }
        else{
            setIsInValidLogin(false);
            navigate("/home");
        }
    })

    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [isLogin, setIsLogin] = React.useState(false);
    const [isInValidLogin, setIsInValidLogin] = React.useState(false);
    
    const handleLogin = () => {
        setIsLogin(true);
        if(email !== "" && password !== ""){
            dispatch(loginRequest({email, password}));
        }
      }

    return(
        <Box sx={styles.box}>

        <Card
            sx={{
                boxShadow: "none",
            }}
        >
            <div style={styles.cardTitle}>
            Login
            </div>
            <div style={styles.cardDiv}>
            <FormControl 
                sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
                variant="outlined"
                error={(isLogin && email === "") || isInValidLogin}
                >
          <InputLabel >Email</InputLabel>
          <OutlinedInput
            type='text'
            label="Email"
            value={email}
            onChange={(e) => {
                setEmail(e.target.value)
                isInValidLogin && setIsInValidLogin(false)
            }}
          />
          {
            (isLogin && email === "") &&<FormHelperText >
            Mandetory field is missing
            </FormHelperText>
          }
          
        </FormControl>
        <FormControl 
            sx={{ m: 1, width: '520px', maxWidth: "100%" }} 
            variant="outlined"
            error={(isLogin && password === "") || isInValidLogin}
            >
          <InputLabel>Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type='password'
            label="Password"
            value={password}
            onChange={(e) => {
                setPassword(e.target.value)
                isInValidLogin && setIsInValidLogin(false)}}
          />
         {(isLogin && password ==="") && <FormHelperText>Mandetory field is missing</FormHelperText>}
         {isInValidLogin && <FormHelperText>Invalid Email or Password</FormHelperText>}

        </FormControl>

        <StyledButton
            sx={{ 
                width: "520px", 
                maxWidth: "100%",
                marginLeft: "8px",}}
            onClick={handleLogin}
        >
            Login
        </StyledButton>
        <div style={styles.registerText}>
            <span>Don't have an account? </span>
            <a 
            style={styles.registerLink}
            href="/create-account">Register Now</a>
        </div>
     </div>
    
        </Card>
        </Box>
    )
}