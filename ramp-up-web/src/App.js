import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.scss";
import StudentPage from "./views/StudentPage";
import { Route, Navigate, Routes } from "react-router-dom";
import SignInPage from "./views/SignInPage";
import SignUpPage from "./views/SignUpPage";
import StudentRoute from "./utils/StudentRoute";

function App() {
  return (
    <div className="App k">
      <Routes>
        <Route element={<StudentRoute />}>
          <Route path="/students" element={<StudentPage />} />
        </Route>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/" element={<Navigate to={"sign-in"} replace />} />
      </Routes>
    </div>
  );
}

export default App;
