import React from 'react';
import logo from './logo.svg';
import './App.css';
import AdminPage from './containers/AdminPage/AdminPage';
import LoadingErrorCard from './containers/AdminPage/Cards/LoadingErrorCard';

function App() {
  return (
    <div className="App">
      <AdminPage />
      {/* <LoadingErrorCard /> */}
    </div>
  );
}

export default App;
