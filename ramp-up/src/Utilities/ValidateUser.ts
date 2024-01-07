import { GridRowModel } from "@mui/x-data-grid";

const validateUser = (user: GridRowModel, requiredFields: string[]) => {
    console.log(requiredFields)
    for (const field of requiredFields) {
        const fieldValue = user[field as keyof GridRowModel];
        if (fieldValue === '' || fieldValue === null) {
            return false;
        }
        console.log(fieldValue, field)
    }
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

const validateMobile = (mobile: string) => {
    // Add your mobile validation logic here
    const mobileRegex = /^\+(\d{1,3})\s(\d{1,2}\s?){1,5}$/;
    return mobileRegex.test(mobile);
};

const validateAddress = (address:string) => {
    if (address==='') {
        return false;
    }
    return true;

}

const validateBirthday = (birthday:Date) => {
    if (birthday===null) {
        return false;
    }
    return true;
}


  




export {validateUser, validateName, validateAge, validateMobile, validateAddress, validateBirthday};