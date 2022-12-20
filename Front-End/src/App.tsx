import * as React from "react";
import Datagrid from "./pages/Home/Home";
import Signup from "./pages/Signup/Signup";
import Signin from "./pages/Signin/Signin";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Datagrid />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
