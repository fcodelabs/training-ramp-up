import React from "react";
import logo from "./logo.svg";
import "./App.css";
import AdminPage from "./containers/AdminPage/AdminPage";
import AddNewUserCard from "./components/Cards/AddNewUserCard";

function App() {
  return (
    <div className="App">
      <AdminPage />
      {/* <AddNewUserCard /> */}
    </div>
  );
}

export default App;
