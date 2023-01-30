import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import '@progress/kendo-theme-material/dist/all.css'
import { Provider } from 'react-redux'
import { store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading='null' persistor={persistor}>
        <Routes>
          <Route path='/*' element={<App />} />
        </Routes>
      </PersistGate>
    </Provider>
  </BrowserRouter>,
)
