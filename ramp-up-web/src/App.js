/* eslint-disable react/react-in-jsx-scope */
import "./App.css";
import GridUi from "./pages/Grid";
import SignInSide from "../src/pages/Signin";
import SignUpSide from "../src/pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    // <div>
    //   <SignInSide />
    // </div>

    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignInSide />}></Route>
        <Route path="/signup" element={<SignUpSide />} />
        <Route path="/grid" element={<GridUi />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
