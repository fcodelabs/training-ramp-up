/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataGrid from './pages/DataGrid/DataGrid';
import SignInPage from './pages/SignInPage/SignInPage';
import SignUpPage from './pages/SignUpPage/SignUpPage';
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
          <Route path="/Home" element={<DataGrid />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
