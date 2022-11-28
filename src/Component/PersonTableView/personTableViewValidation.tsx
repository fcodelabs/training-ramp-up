import Person from '../../utils/interface'
import { addDays } from '@progress/kendo-date-math'

const personTableViewValidation = (person: Person) => {
  const name = /^([A-z\s.]{3,20})$/

  const address = /^([A-z0-9/,\s]{5,})$/

  const mobileNo = /^([0][0-9]{9})$/

  const dob: boolean = addDays(new Date(), 1) > new Date()

  if (name.test(person.personName)) {
    if (person.gender !== '') {
      if (address.test(person.address)) {
        if (mobileNo.test(person.mobileNo)) {
          if (person.dob !== null && dob) {
            return true
          } else {
            alert('Enter Valid Date of birth')
            return false
          }
        } else {
          alert('Enter Valid phone number')
          return false
        }
      } else {
        alert('Enter the address')
        return false
      }
    } else {
      alert('Select valid gender')
      return false
    }
  } else {
    alert('Enter valid name')
    return false
  }
}

export default personTableViewValidation
