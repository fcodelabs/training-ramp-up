import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";
import UserPage from "./containers/UserPage/UserPage";
import SelfRegitrationPage from "./containers/SelfRegistrationPage/SelfRegistrationPage";
import { useEffect, useState } from "react";
import WebSocketService from "./websocket/webSocket";
import { useDispatch } from "react-redux";
import { fetchStudents } from "./redux/studentReducer";
import { fetchUsers } from "./redux/userReducer";

interface Notification {
  message: string;
}

function App() {
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<string[]>([]);

  useEffect(() => {
    dispatch(fetchStudents());
    dispatch(fetchUsers());
    WebSocketService.connect();
    console.log("Connect to the server");

    const notificationListener = (message: Notification) => {
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        message.message,
      ]);
    };
    WebSocketService.onNotification(notificationListener);

    return () => {
      WebSocketService.disconnect();
      console.log("Disonnect to the server");
      WebSocketService.offNotification(notificationListener);
    };
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<HomePage notifications={notifications} />}
          ></Route>
          <Route
            path="/users"
            element={<UserPage notifications={notifications} />}
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<SelfRegitrationPage />}></Route>
          <Route path="*" element={<div>Page not found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
