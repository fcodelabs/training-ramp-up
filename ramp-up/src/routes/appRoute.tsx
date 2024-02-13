import React from "react";
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import requireAuth from "../utility/requireAuth";
import redirectLogged from "../utility/redirectLogged";
import { homeRoute } from "./home";
import { unprotectedRoutes} from "./unprotected";

export function AppRoute () {

const protectedRoutes = [...homeRoute]

const unprotected = [...unprotectedRoutes]  

return (
    <BrowserRouter>
        <Routes>
        {unprotected.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            element={
                <redirectLogged>
                    
                </redirectLogged>
            }
            />
        ))}
        {protectedRoutes.map((route, index) => (
            <Route
            key={index}
            path={route.path}
            element={requireAuth({ children: route.ele, roles: route.availability })}
            />
        ))}
        </Routes>
    </BrowserRouter>
)
        }