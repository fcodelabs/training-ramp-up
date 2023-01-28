import './App.css'
import { Table } from './pages/rampUpHome/HomePage'
import { SignInPage } from './pages/signInPage/SignInPage'

function App(): JSX.Element {
  return (
    <div className='App'>
      {/* <Table /> */}
      <SignInPage />
    </div>
  )
}

export default App
