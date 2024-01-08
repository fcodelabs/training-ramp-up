import { GridRowModel } from "@mui/x-data-grid";
import parsePhoneNumber from 'libphonenumber-js';



const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    console.log(requiredFields)
    
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