import { GridRowModel } from '@mui/x-data-grid'
import parsePhoneNumber from 'libphonenumber-js'

const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    console.log('validateUser', user)

    try {
        if (requiredFields.includes('name') && !validateName(user.name)) {
            return false
        }
        if (requiredFields.includes('age') && !validateAge(user.age)) {
            return false
        }
        if (requiredFields.includes('mobile') && !validateMobile(user.mobile)) {
            return false
        }
        if (
            requiredFields.includes('address') &&
            !validateAddress(user.address)
        ) {
            return false
        }
        if (
            requiredFields.includes('birthday') &&
            !validateBirthday(user.birthday)
        ) {
            return false
        }
    } catch (error) {
        throw new Error('Error in validating user')
    }
    return true
}

const validateName = (name: Date | string | number) => {
    if (/\d/.test(String(name))) {
        return false
    }
    if (name === '' ) {
        return false
    }
    return true
}

const validateAge = (age: number | string | Date) => {
    if (Number(age) < 18) {
        return false
    }
    return true
}

const validateAddress = (address: Date | string | number) => {
    if (address === '') {
        return false
    }
    return true
}

const validateMobile = (inputValue: Date | string | number) => {
    try {
        const phoneNumberObj = parsePhoneNumber(String(inputValue))
        return phoneNumberObj!.isValid()
    } catch (error) {
        if (
            inputValue === undefined ||
            inputValue === null ||
            inputValue === ''
        ) {
            return false
        }
        if (
            String(inputValue).length === 10 &&
            String(inputValue).startsWith('0') &&
            /^\d+$/.test(String(inputValue))
        ) {
            return true
        }
        return false
    }
}

const validateBirthday = (birthday: Date | string | number) => {
    if (birthday === null) {
        return false
    }
    return true
}

export {
    validateUser,
    validateName,
    validateAge,
    validateMobile,
    validateAddress,
    validateBirthday,
}
