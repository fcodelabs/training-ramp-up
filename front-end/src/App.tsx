import React, { useEffect } from "react";
import "./App.css";
import WebSocketService from "./websocket/webSocket";
import HomePage from "./containers/HomePage/HomePage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./containers/LoginPage/LoginPage";

function App() {
  useEffect(() => {
    WebSocketService.connect();
    console.log("WebSocketService.connect()");

    return () => {
      WebSocketService.disconnect();
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
