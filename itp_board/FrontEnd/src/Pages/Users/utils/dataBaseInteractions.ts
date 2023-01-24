import { User } from './types'

type DisplayErrorsCallBack = (errors: string[]) => void
export const createStudent = async (record: User) => {
  const data = record
  const options = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  const res = await fetch('http://localhost:4000/student', options)
  const json = await res.json()

  if (json === null) {
    throw new Error('Data adding Error')
  }
  return json
}
export const editStudent = async (record: User) => {
  const data = record
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  }
  const res = await fetch('http://localhost:4000/student', options)
  const json = await res.json()
  console.log(json)

  if (json === null) {
    throw new Error('Data editing Error')
  }
  return json
}
type Json = {
  id: number
  name: string
  gender: string
  address: string
  mobileNo: string
  dateOfBirth: string

}
export const getData = async (displayErrors:DisplayErrorsCallBack) => {
try {
    const response = await fetch('http://localhost:4000/student')
    const json:Json[] = await response.json()
   const data:User[] = [];
   json.forEach((item)=>{
      data.push(
        {
            id:item.id,
            name:item.name,
            gender:item.gender,
            address:item.address,
            mobileNo:item.mobileNo,
            dateOfBirth:new Date(item.dateOfBirth),
        }
      )
   })
    return data
} catch (error:any) {
  displayErrors([error.message])
  return [];
}

}

export const deleteStudent = async (id: number) => {
  try {
    const response = await fetch(`http://localhost:4000/student/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
    return response
  } catch (error: any) {
    return { ok: false, statusText: error.message }
  }
}
