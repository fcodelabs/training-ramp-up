import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import HomePage from './components/HomePage';
import AuthPage from './pages/AuthPage';

function App() {
  const accessToken = localStorage.getItem('refreshToken');
  return (
    <main>
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Navigate to='/auth/login' />} />
        <Route path='/auth/login' element={<AuthPage />} />
        <Route path='/auth/signup' element={<AuthPage />} />
        {accessToken !== undefined && (
          <Route path='/home' element={<HomePage />} />
        )}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </main>
  );
}

export default App;
