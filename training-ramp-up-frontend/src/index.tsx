import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import { io } from 'socket.io-client'


const socket = io('http://localhost:4000/', {
    transports: ['websocket'],
})

socket.on('connect', () => {
    console.log(socket.id) // x8WIv7-mJelg7on_ALbx
})

socket.on('notification', (...args) => {
    alert(args[0])
})



const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
        <Provider store={store}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </Provider>
    </React.StrictMode>
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
