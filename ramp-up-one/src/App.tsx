/* eslint-disable react/react-in-jsx-scope */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import DataGrid from './pages/DataGrid/DataGrid';

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
