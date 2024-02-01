import { Route, Routes, Navigate, Outlet } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Role, authenticate } from "../../redux/user/slice";
import { Paths } from "../../App";
const urlParams = new URLSearchParams(window.location.search);
const token = urlParams.get("token");

import React, { useState, useEffect } from "react";

export default function ProtectedRoute(children: any) {
  const role = useAppSelector((state) => state.user.role);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(authenticate(token));
  }, []);

  if (role) {
    return <Outlet />;
  } else {
    return <div></div>;
  }
}
