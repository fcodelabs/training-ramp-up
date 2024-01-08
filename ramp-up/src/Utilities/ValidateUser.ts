import { GridRowModel } from "@mui/x-data-grid";
import parsePhoneNumber from 'libphonenumber-js';

const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    console.log('validateUser', user, requiredFields)

    if (requiredFields.includes('name') ) {
        console.log('name', user.name, )
        return false;
    }
    if (requiredFields.includes('age') && !validateAge(user.age)) {
        console.log('age', user.age, )
        return false;
    }
    if (requiredFields.includes('mobile') && !validateMobile(user.mobile)) {
        console.log('mobile', user.mobile, )
        return false;
    }
    if (requiredFields.includes('address') && !validateAddress(user.address)) {
        console.log('address', user.address, )
        return false;
    }
    if (requiredFields.includes('birthday') && !validateBirthday(user.birthday)) {
        console.log('birthday', user.birthday, )
        return false;
    }
    console.log('validatedUser', user, requiredFields)   
    return true
};

const validateName = (name: string) => {
    if (name==='') {
        return false;
    }
    return true;
}

const validateAge = (age: number) => {
    if (age<18) {
        return false;
    }
    return true;
}


const validateAddress = (address:string) => {
    if (address==='') {
        return false;
    }
    return true;

}
const validateMobile = (inputValue: string) => {
    try{
      const phoneNumberObj = parsePhoneNumber(inputValue);
      return (phoneNumberObj!.isValid());
    } catch (error) {
      if (inputValue.startsWith('0') && inputValue.length === 10 && /^\d+$/.test(inputValue)) {
        return true;
      }
      return false;
    }
  };

const validateBirthday = (birthday:Date) => {
    if (birthday===null) {
        return false;
    }
    return true;
}



  




export {validateUser, validateName, validateAge, validateMobile, validateAddress, validateBirthday};