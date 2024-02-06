import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminPage from "./containers/AdminPage/AdminPage";

import NewPasswordPage from "./containers/NewPasswordPage/NewPasswordPage";
import LoginPage from "./containers/LoginPage/LoginPage";
import RegisterPage from "./containers/RegisterPage/RegisterPage";

function App() {
  return (
    <div className="App">
      {/* <AdminPage /> */}

      <NewPasswordPage />
      {/* <LoginPage /> */}
      {/* <RegisterPage /> */}
    </div>
  );
}

export default App;
