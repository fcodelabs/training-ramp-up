import { BrowserRouter, Route, Routes } from "react-router-dom";
//import "./App.css";

import HomeRampUp from "./pages/HomeRampUp";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeRampUp />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
