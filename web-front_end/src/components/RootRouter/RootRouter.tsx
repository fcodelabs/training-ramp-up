import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "../../containers/Home/Home";
import { HOME, SIGN_IN, SIGN_UP } from "../../util/routesUtil";
import SignIn from "../../containers/SignIn/SignIn";
import SignUp from "../../containers/SignUp/SignUp";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../redux/store";
import { userActions } from "../../redux/user/userSlice";

const RootRouter = () => {
  const isAuthenticated = useSelector((state: RootState) => state.userEntries.isAuthenticated);
  const email = useSelector((state: RootState) => state.userEntries.currentEmail);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(userActions.setCurrentUser(email));
      navigate(HOME);
    } else {
      navigate(SIGN_IN);
    }
  }, [isAuthenticated]);

  return (
    <Routes>
      <Route path={HOME} element={<Home />} />
      <Route path={SIGN_IN} element={<SignIn />} />
      <Route path={SIGN_UP} element={<SignUp />} />
    </Routes>
  );
};

export default RootRouter;
