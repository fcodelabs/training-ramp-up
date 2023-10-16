import { useState } from 'react'
import './App.css'
import AddNewButton from './student-table/AddNewButton'
import StudentTable from './student-table/StudentTable'

function App() {
  const [visible,setVisible] = useState(false)

  return (
    <>
      <AddNewButton label='Add New' onClick={()=>setVisible(!visible)}/>
      <StudentTable visible={visible} />
    </>
  )
}

export default App
