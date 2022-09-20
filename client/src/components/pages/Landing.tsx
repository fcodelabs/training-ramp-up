import  { useEffect, useState } from 'react';
import { Link } from '@mui/material';

import "./landing.css";

//Sign in Sign Up component panels

import SignIn from "../SignIn";
import SignUp from "../SignUp";
import { signinStatus } from '../../services';
import { useNavigate } from 'react-router-dom';


export default function Landing(){
    const [compState, setCompState] = useState(false);
    const navigate = useNavigate();
    useEffect(()=>{
        signinStatus().then(()=>navigate("/")).catch((error)=>console.log("Authorization failed, Sign Up/Log in to continue!"));
    },[])
    return (
    <div className="landing">
        {compState?<SignUp /> : <SignIn />}
       <Link onClick={()=>setCompState(!compState)} sx={{cursor:"pointer"}}>
            {compState?"Already have an account? Sign In":"Don't have an account? Sign Up"}
        </Link>
    </div>
    )
}