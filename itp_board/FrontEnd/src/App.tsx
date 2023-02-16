import './App.css'
import {Routes, Route} from 'react-router-dom'
import Students from './pages/students/Students'
import SignUp from './pages/signUp/SignUP';
import SignIn from './pages/signIn/SignIn';
import RequireAuth from './utils/RequireAuth';


function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<SignIn/>}/>
                <Route path='signup' element={<SignUp/>}/>
                <Route path='students' element={
                    <RequireAuth>
                        <Students/>
                    </RequireAuth>
                }/>

            </Routes>
        </>
    )
}

export default App
