import { User } from '../models/User'
import { getUser } from '../services/UserServices'


const validations = new Map([
    ['name', new RegExp('^([A-z\\s.]{3,80})$')],
    ['username', new RegExp('^([A-z0-9/,\\s]{3,})$')],
    ['password', new RegExp('^([A-z0-9]{6,})$')],
])

const validateFields = (input: User): boolean => {
    validations.forEach(function (value, key) {
        if (input[key] != undefined) {
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
        }
    })

    return true
}

const doesUserAlreadyExist=async(username:string){
    const user= await getUser(username);
    if(user==null){
        return true
    }else {
       throw new Error('User Already exists.Please use a different username')
    }
    return false
}

export const validate = async(item: User): Promise<boolean> => {
    return validateFields(item)  && await doesUserAlreadyExist(item.username)
}
