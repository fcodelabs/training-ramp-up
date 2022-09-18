import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Landing from "./components/pages/Landing";
import Dashboard from "./components/pages/Dashboard";
export default function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />}/>
          <Route path="/dashboard" element={<Dashboard />}/>
        </Routes>
    </BrowserRouter>
  )
}
