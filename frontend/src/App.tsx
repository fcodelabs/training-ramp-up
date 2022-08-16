import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './components/HomePage';
import SignupPage from './pages/SignupPage';

function App() {
  return (
    <main>
      <Routes>
        <Route path='/' element={<Navigate to='/signin' />} />
        <Route path='/signin' element={<SignupPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='*' element={<SignupPage />} />
      </Routes>
    </main>
  );
}

export default App;
