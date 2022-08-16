import { useEffect } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import HomePage from './components/HomePage';
import AuthPage from './pages/AuthPage';

function App() {
  let accessToken;
  useEffect(() => {
    accessToken = localStorage.getItem('accessToken');
    console.log(accessToken);
  }, [accessToken]);

  return (
    <main>
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Navigate to='/auth/login' />} />
        <Route path='/auth/login' element={<AuthPage />} />
        <Route path='/auth/signup' element={<AuthPage />} />
        {accessToken !== null && <Route path='/home' element={<HomePage />} />}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </main>
  );
}

export default App;
