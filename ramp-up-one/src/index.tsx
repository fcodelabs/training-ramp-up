import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import '@progress/kendo-theme-default/dist/all.css';
// import store and provider
import { Provider } from 'react-redux';
import store from '../src/store';

import { io } from 'socket.io-client';
const socket = io('http://localhost:8000/', {
  transports: ['websocket'],
});
socket.on('connect', () => {
  console.log(socket.id);
});

socket.on('notification', (data: string) => {
  alert(data);
});



const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
