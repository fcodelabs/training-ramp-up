import { GridRowModel } from "@mui/x-data-grid";
import parsePhoneNumber from 'libphonenumber-js';

const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    try{
        // throw new Error("Error in validating user") ;
    if (requiredFields.includes('name') && !validateName(user.name)) {
        return false;
    }
    if (requiredFields.includes('age') && !validateAge(user.age)) {
        return false;
    }
    if (requiredFields.includes('mobile') && !validateMobile(user.mobile)) {
        return false;
    }
    if (requiredFields.includes('address') && !validateAddress(user.address)) {
        return false;
    }
    if (requiredFields.includes('birthday') && !validateBirthday(user.birthday)) {
        return false;
    }}
    catch(error){
        throw new Error("Error in validating user") ;
    }
    return true
};

const validateName = (name: string) => {
    if (name === '') {
        return false;
    }
    return true;
}

const validateAge = (age: number) => {
    if (age < 18) {
        return false;
    }
    return true;
}


const validateAddress = (address: string) => {
    if (address === '') {
        return false;
    }
    return true;

}
const validateMobile = (inputValue: string) => {
    try {
        const phoneNumberObj = parsePhoneNumber(inputValue);
        return (phoneNumberObj!.isValid());
    } catch (error) {
        if (inputValue === undefined || inputValue === null || inputValue === '') {
            return false;
        }
        if (inputValue.length === 10 && inputValue.startsWith('0')  && /^\d+$/.test(inputValue)) {
            return true;
        }
        return false;
    }
};

const validateBirthday = (birthday: Date) => {
    if (birthday === null) {
        return false;
    }
    return true;
}








export { validateUser, validateName, validateAge, validateMobile, validateAddress, validateBirthday };