import  { useEffect, useState } from 'react';
import { Link } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { checkUser } from '../../state/slices';
import {  useNavigate } from 'react-router-dom';
import type { RootState } from '../../state/store'
import "./landing.css";

//Sign in Sign Up component panels
import SignIn from "../SignIn";
import SignUp from "../SignUp";



export default function Landing(){
    const [compState, setCompState] = useState(false);
    const {user} = useSelector((state: RootState)=>state);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(()=>{
        dispatch(checkUser());
    },[])

    useEffect(()=>{
        if(user){
            navigate("/dashboard");
            return;
        }
    },[user])

    return (
    <div className="landing">
        {compState?<SignUp /> : <SignIn />}
       <Link onClick={()=>setCompState(!compState)} sx={{cursor:"pointer"}}>
            {compState?"Already have an account? Sign In":"Don't have an account? Sign Up"}
        </Link>
    </div>
    )
}