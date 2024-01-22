import React from "react";
import Home from "./containers/Home/Home";
const userId = Math.floor(Math.random() * 1000000);
localStorage.setItem("userId", userId.toString());

function App() {
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
