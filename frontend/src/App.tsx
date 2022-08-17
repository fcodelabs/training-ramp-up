import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import ButtonAppBar from './components/ButtonAppBar';
import HomePage from './components/HomePage';
import AuthPage from './pages/AuthPage';
import { RootState } from './store';

function App() {
  const loggedState = useSelector((state: RootState) => state.log.isLoggedIn);
  useEffect(() => {}, []);

  return (
    <main>
      <ButtonAppBar />
      <Routes>
        <Route path='/' element={<Navigate to='/auth/login' />} />
        <Route path='/auth/login' element={<AuthPage />} />
        <Route path='/auth/signup' element={<AuthPage />} />
        {loggedState && <Route path='/home' element={<HomePage />} />}
        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </main>
  );
}

export default App;
