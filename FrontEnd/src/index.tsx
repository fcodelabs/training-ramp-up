import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { socket } from './services/services'
import { toast } from 'react-toastify'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
socket.on('user_added', (data) => {
  toast.info(data.username +' is added!')
})
socket.on('user_updated', (data) => {
  toast.info(data.username +' is updated!')
})
socket.on('user_removed', (data) => {
  toast.info(data.username +' is removed!')
})
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
