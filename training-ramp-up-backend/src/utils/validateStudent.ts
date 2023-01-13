import { Student } from '../models/Student'

const validations = new Map([
    ['name', new RegExp('^([A-z\\s.]{3,80})$')],
    ['address', new RegExp('^([A-z0-9/,\\s]{3,})$')],
    ['mobileNo', new RegExp('^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$')],
    ['gender', new RegExp('^(MALE|FEMALE)$', 'i')],
    ['age', new RegExp('^([0-9]{1,2})$')],
])

const validateFields = (input: Student): boolean => {
    validations.forEach(function (value, key) {
        if (input[key] != undefined) {
            if (!value.test(input[key])) {
                throw new Error('Please enter valid ' + key)
            }
        }
    })

    return true
}

const validateBirthdayAndAge = (dateOfBirth: Date, age: number): boolean => {
    const today = new Date().getTime()
    const birthday = new Date(dateOfBirth).getTime()
    const tempAge = Math.floor((today - birthday) / (86400000 * 365))
    const validBirthday = tempAge >= 18
    if (!validBirthday) {
        throw new Error('You should be older than 18 years old')
    } else if (age != tempAge) {
        throw new Error('There is a conflict between the age and the birthday')
    } else {
        return true
    }
}

export const validate = (item: Student): boolean => {
    return validateFields(item) && item.dateOfBirth != undefined
        ? validateBirthdayAndAge(item.dateOfBirth, item.age)
        : true
}
