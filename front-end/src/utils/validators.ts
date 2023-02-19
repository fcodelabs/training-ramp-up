import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Student } from './interfaces'

export const checkValid = (student: Student) => {
  if (!student.name || !student.mobile || !student.address || !student.dob) {
    toast.error('Please fill all the fields', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return false
  } else if (
    validateName(student.name) &&
    validateMobile(student.mobile) &&
    validateAge(age(student.dob))
  ) {
    student.age = age(student.dob)
    return true
  } else {
    return false
  }
}

export const age = (dateOfBirth: Date) => {
  const today = new Date()
  const birthDate = new Date(dateOfBirth)
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()

  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }

  return age
}

const validateMobile = (value: string) => {
  const regex = new RegExp(/^[0-9]+$/)
  if (value !== '' && regex.test(value) && value.length === 10) {
    return true
  } else {
    toast.error('Enter Valid Mobile Number', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return false
  }
}

const validateName = (value: string) => {
  const regex = new RegExp(/^[a-zA-Z\s]*$/)
  if (value !== undefined && value !== '' && regex.test(value)) {
    return true
  } else {
    toast.error('Enter Valid Name', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return false
  }
}

const validateAge = (value: number) => {
  if (value >= 18) {
    return true
  } else {
    toast.error('Age should be greater than 18', {
      position: toast.POSITION.TOP_RIGHT,
    })
    return false
  }
}
