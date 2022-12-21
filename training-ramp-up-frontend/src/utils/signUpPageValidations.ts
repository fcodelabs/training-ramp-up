import { User } from './interfaces'

const validations = new Map([
    ['name', new RegExp('^([A-z\\s.]{3,80})$')],
    ['username', new RegExp('^([A-z0-9/,\\s]{3,})$')],
    ['password', new RegExp('^([A-z0-9]{6,})$')],
])

const validateFields = (input: any): boolean => {
    validations.forEach(function (value, key) {
        if (input[key] != '') {
            if (!value.test(input[key])) {
                const err =
                    key == 'password'
                        ? new Error(
                            'Please enter valid ' +
                                  key +
                                  '\n\n* Password should contain at least 6 characters'
                        )
                        : new Error('Please enter valid ' + key)
                throw err
            }
        } else {
            throw new Error('Please enter ' + key)
        }
    })
    return true
}

export const validate = (item: User): boolean => {
    try {
        return validateFields(item)
    } catch (err) {
        alert(err)
    }
    return false
}
