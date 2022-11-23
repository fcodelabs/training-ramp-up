import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataGrid from './pages/DataGrid/DataGrid';
// import './App.css';

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DataGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
