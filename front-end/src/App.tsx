import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
// import Routes from "./routes";
import HomePage from "./containers/HomePage/HomePage";
import LoginPage from "./containers/LoginPage/LoginPage";
import UserPage from "./containers/UserPage/UserPage";
import SelfRegitrationPage from "./containers/SelfRegistrationPage/SelfRegistrationPage";

function App() {
  //   useEffect(() => {
  //     WebSocketService.connect();
  //     console.log("Connect to the server");

  //     return () => {
  //       WebSocketService.disconnect();
  //       console.log("Disonnect to the server");
  //     };
  //   }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />}></Route>
        <Route path="/users" element={<UserPage />}></Route>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<SelfRegitrationPage />}></Route>
        <Route path="*" element={<div>Page not found</div>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
