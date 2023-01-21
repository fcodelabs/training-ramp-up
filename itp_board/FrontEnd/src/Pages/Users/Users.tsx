import Table from '../../component/Table'
import { io } from 'socket.io-client'
import { useEffect, useState } from 'react'
const socket = io('http://localhost:4000')

type Student = {
  id: string
  name: string
  gender: string
  address: string
  dob: string
  mobileNo: string
  index: number
}

const Users = () => {
  const [newStudent, setNewStudent] = useState<Student | null>(null)
  useEffect(() => {
    socket.on('new_student_added', (data: Student) => {
      setNewStudent(data)
    })
  }, [socket])
  return (
    <>
      {newStudent && (
        <>
          <h2>New Student Added</h2>
          <h3>Details of New Student:</h3>

          <h4>Id:{newStudent.id} </h4>
          <h4>Name:{newStudent.name} </h4>
          <h4>Gender:{newStudent.gender} </h4>
          <h4>Address:{newStudent.address} </h4>
          <h4>dob:{newStudent.dob}</h4>
          <h4>MobileNo:{newStudent.mobileNo} </h4>
        </>
      )}
      <Table />
    </>
  )
}

export default Users
