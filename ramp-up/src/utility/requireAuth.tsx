import React from "react";
import { Navigate } from "react-router-dom";

const requireAuth = ({children, roles}) => {


    const currentUser = localStorage.getItem('currentUser');
    console.log(currentUser);
    let userRole;
    if(currentUser!== null){
        userRole = JSON.parse(currentUser).role;
    }
    console.log(userRole);
    if (userRole) {
        if (roles.includes(userRole)) {
            console.log("user is authorized");
            return children;
        } 
    } else {
        return <Navigate to="/" />;
    }   
}

export default requireAuth;

