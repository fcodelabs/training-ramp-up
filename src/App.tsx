import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import '@progress/kendo-theme-default/dist/all.css';
import Grids from './pages/Grid/grid';

function App() {
  return (
    <BrowserRouter>
    <Routes>
         <Route path="/" element={<Grids/>} />
     </Routes> 
     </BrowserRouter>   
  );
}

export default App;
