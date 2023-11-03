import React, { useEffect } from "react";
import "./App.css";
import WebSocketService from "./websocket/webSocket";
import HomePage from "./containers/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";

function App() {
  useEffect(() => {
    WebSocketService.connect();
    console.log("Connect to the server");

    return () => {
      WebSocketService.disconnect();
      console.log("Disonnect to the server");
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="login/" element={<LoginPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
