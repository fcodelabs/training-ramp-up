// import { useDispatch } from 'react-redux';
import React, { useState } from "react";
import { Card, TextField, Typography, Button, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidEmail, routePaths, userRoles } from "../../utils";
import axios from "axios";

const cardStyles = {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRadius: "16px",
    maxWidth:"400px"
};

function Register(){

    const navigate = useNavigate();

    const [errorEmail, setErrorEmail] = useState(false);
    const [errorStatus, setError] = useState(false); //api error status
    const [errorMessage, setErrorMsg] = useState(""); //api error message status

    const linkHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate(routePaths.signIn);
    }
    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const name = formData.get("name");
        const email = formData.get("email") as string;
        const password = formData.get("password");
        if(isValidEmail(email)){
            setErrorEmail(false);
            const registeredUser = {
                username : email,
                name : name,
                password : password,
                role : userRoles.user
            }
            try {
                const response = await axios.post('http://localhost:4000/register', registeredUser, {
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  withCredentials: true,
                });
        
                if (response.data.status === 200) {
                    setError(false);
                  navigate(routePaths.home);
                } else {
                  setError(true);
                  setErrorMsg(response.data.error)
                }
            } catch (error:any) {
                setError(true);
                setErrorMsg(error.response.data.error)
            }
        }else{
            setErrorEmail(true);
        }
    }

    return (
        <React.Fragment>
          <Card variant="outlined" sx={cardStyles}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                            Register
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" sx={{ marginBottom: "30px" }}>
                            Do you have an account?
                            <Link href="#" onClick ={linkHandler} > SignIn</Link>
                            </Typography>
                        </Grid>
                        {errorStatus &&
                        <Alert severity="error">{errorMessage}</Alert>
                        }
                        <Grid item xs={12}>
                            <TextField name="name"  size="small" label="Name" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="email" error={errorEmail}  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="password"  size="small" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12} alignContent={"center"}>

                            <Button type="submit" size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >
                                Register
                            </Button>
                        </Grid>
                    </Grid>
                </form>
          </Card>
        </React.Fragment>
    );
}


export default Register;