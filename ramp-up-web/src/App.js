import React from "react";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.scss";
import StudentPage from "./views/Students/pages/StudentPage";

function App() {
  return (
    <div className="App k">
      <StudentPage />
    </div>
  );
}

export default App;
