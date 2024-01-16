import DataGrids from './components/DataGrids/DataGrids'
import TopBar from './components/TopBar/TopBar'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Grid from './containers/Grid/Grid'
import DialogBox from './components/DialogBox/DialogBox'

function App() {
  return (
    <div className="App">
      <TopBar />
      <DataGrids />
    </div>
  )
}

export default App
