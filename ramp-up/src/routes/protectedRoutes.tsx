import React, { useEffect } from "react";
import { Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { authCheckRequest } from "../redux/slices/userSlice";
import { useDispatch } from "react-redux";

function ProtectedRoutes({children}) {
    const dispatch = useDispatch();

    const isAuthorized = useSelector((state: RootState) => state.user.userState.isAuthorized);


    useEffect(()=> {
        dispatch(authCheckRequest());
    },[])

    return(
        console.log(isAuthorized),
        isAuthorized ? children : <Navigate to="/" />

    )
}

export default ProtectedRoutes;