import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import reportWebVitals from './reportWebVitals'
import store from './redux/store'
import { Provider } from 'react-redux'
import 'react-phone-number-input/style.css'
import { BrowserRouter as Router} from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <Router>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>
)

reportWebVitals()
