import { useEffect } from 'react'
import { io } from 'socket.io-client'
import './App.css'
import { Table } from './pages/rampUpHome/Table'

function App(): JSX.Element {

  useEffect(() => {
    io('http://localhost:5000')
  }, [])

  return (
    <div className='App'>
      <Table />
    </div>
  )
}

export default App
