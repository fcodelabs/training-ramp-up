// import { useDispatch } from 'react-redux';
import React, { useEffect, useState } from "react";
import { Card, TextField, Typography, Button, Grid, Link, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { isValidEmail, routePaths } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../redux/user/userSlice";

const cardStyles = {
    padding: "20px 50px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent:"center",
    borderRadius: "16px",
    maxWidth:"400px"
  };

function SignIn(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    //set error status null;
    useEffect(() =>{
        dispatch(userActions.setErrorStatus(null))
    },[]);
    //initialize error status and msg for users
    const errorStatus = useSelector((state: {users: any; errorStatus:boolean} ) => state.users.errorStatus);
    const errorMessage = useSelector((state: {users: any; errorMsg:string | null} ) => state.users.errorMsg);

    //navigate user to home after a successfull signin
    useEffect(() =>{
        if(errorStatus === false){
          dispatch(userActions.setErrorStatus(null))
          navigate(routePaths.home);
        }
    },[ errorStatus, dispatch, navigate]);

    const [errorEmail, setErrorEmail] = useState(false);

    //navigate to signing page
    const linkHandler = (event: { preventDefault: () => void; }) => {
        event.preventDefault();
        navigate(routePaths.register);
    }

    //mail field validation
    const mailChangeHandler = (event: { target: { value: string } }) => {
        const email =  event.target.value;
        if(isValidEmail(email)){
            setErrorEmail(false);
        }
    }

    //form submit vvalidation and pass data
    const submitHandler = async (event: any) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const email = formData.get("email") as string;
        const password = formData.get("password");
    
        if (isValidEmail(email)) {
          setErrorEmail(false);
    
          const userData = {
            username: email,
            password: password,
          };
          dispatch(userActions.processAuth(userData));
        } else {
          setErrorEmail(true);
        }
      };

    return (
        <React.Fragment>
          <Card variant="outlined" sx={cardStyles}>
                <form onSubmit={submitHandler}>
                    <Grid container spacing={2} direction="column" alignItems={"center"} justifyContent={"center"} >
                        <Grid item xs={12}>
                            <Typography variant="h4" align="center" sx={{ color: "#039BE5"}}>
                            Sign In
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" align="center" sx={{ marginBottom: "30px" }}>
                            Don't you have an account?
                            <Link href="#" onClick ={linkHandler} > Register</Link>
                            </Typography>
                        </Grid>
                        {errorStatus &&
                        <Alert severity="error">{errorMessage} </Alert>
                        }
                        <Grid item xs={12}>
                            <TextField name="email" error={errorEmail}  onChange={mailChangeHandler}   size="small" label="Email address" variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField name="password"   size="small" label="Password" type="password"  variant="outlined" InputProps={{ sx: { height: "45px"} }} fullWidth required />
                        </Grid>
                        <Grid item xs={12} alignContent={"center"}>
                            <Button type="submit" size="large" variant="contained" sx={{ borderRadius: "16px", marginTop: "30px" }} >
                                Sign In
                            </Button>
                        </Grid>
                    </Grid>
                </form>
          </Card>
        </React.Fragment>
    );
}

export default SignIn;