import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { store } from './store'
import { Provider } from 'react-redux'
import { io } from 'socket.io-client'
// import setupInterceptors from './services/setupInterceptors'

const socket = io('http://localhost:8000/', {
  transports: ['websocket']
})

socket.on('connect', () => {
  console.log(`connect client ${socket.id}`)
})

socket.on('notification', (data: string) => {
  alert(data)
})

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)

// setupInterceptors(store)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
