import './App.css'
import { HomePage } from './pages/rampUpHome/HomePage'
import { SignInPage } from './pages/signInPage/SignInPage'

function App(): JSX.Element {
  return (
    <div className='App'>
      {/* <HomePage />  */}
      <SignInPage />
    </div>
  )
}

export default App
