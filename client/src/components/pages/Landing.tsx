import  { useState } from 'react';
import { Link } from '@mui/material';

import "./landing.css";

//Sign in Sign Up component panels

import SignIn from "../SignIn";
import SignUp from "../SignUp";


export default function Landing(){
    const [compState, setCompState] = useState(false);
    return (
    <div className="landing">
        {compState?<SignUp /> : <SignIn />}
       <Link onClick={()=>setCompState(!compState)} sx={{cursor:"pointer"}}>
            {compState?"Already have an account? Sign In":"Don't have an account? Sign Up"}
        </Link>
    </div>
    )
}