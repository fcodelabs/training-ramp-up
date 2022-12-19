import { Person } from './interfaces'

const validations = new Map([
    ['name', new RegExp('^([A-z\\s.]{3,80})$')],
    ['gender', new RegExp('^(MALE|FEMALE)$', 'i')],
    ['address', new RegExp('^([A-z0-9/,\\s]{3,})$')],
    ['mobileNo', new RegExp('^([0][0-9]{9}|[0][0-9]{2}[-\\s][0-9]{7})$')],
])

//Validation
//inputValue: any, field: string,

const validateFields = (input: any): boolean => {
    validations.forEach(function (value, key) {
        if (input[key] != undefined) {
            if (!value.test(input[key])) {
                throw new Error('Please enter valid ' + key)
            }
        } else {
            throw new Error('Please enter valid ' + key)
        }
    })
    return true
}

const validateBirthday = (dateOfBirth: any): boolean => {
    if (dateOfBirth != null) {
        const today = new Date().getTime()
        const birthday = new Date(dateOfBirth).getTime()
        const age = Math.floor((today - birthday) / (86400000 * 365))
        const validBirthday = age >= 18
        if (!validBirthday) {
            throw new Error('You should be older than 18 years old')
        } else {
            return true
        }
    } else {
        throw new Error('Please enter a valid birthday')
    }
}

export const validate = (item: Person): boolean => {
    try {
        return validateFields(item) && validateBirthday(item.dateOfBirth)
    } catch (err) {
        alert(err)
    }
    return false
}
