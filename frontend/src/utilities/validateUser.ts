import { GridRowModel } from "@mui/x-data-grid";
import parsePhoneNumber from "libphonenumber-js";


const isEmptyFields = (user: GridRowModel, requiredFields: string[]) => {
  try {
    if (requiredFields.includes("name") && user.name === "") {
      return true;
    }
    if (requiredFields.includes("age") && user.age === "") {
      return true;
    }
    if (requiredFields.includes("mobile") && user.mobile === "") {
      return true;
    }
    if (requiredFields.includes("address") && user.address === "") {
      return true;
    }
    if (requiredFields.includes("birthday") && user.birthday === null) {
      return true;
    }
  } catch (error) {
    throw new Error("Error in validating user");
  }
  return false;
}


const validateUser = (user: GridRowModel, requiredFields: string[]) => {
  try {
    if (requiredFields.includes("name") && !validateName(user.name)) {
      return false;
    }
    if (requiredFields.includes("age") && !validateAge(user.age)) {
      return false;
    }
    if (requiredFields.includes("mobile") && !validateMobile(user.mobile)) {
      return false;
    }
    if (requiredFields.includes("address") && !validateAddress(user.address)) {
      return false;
    }
    if (
      requiredFields.includes("birthday") &&
      !validateBirthday(user.birthday)
    ) {
      return false;
    }
  } catch (error) {
    throw new Error("Error in validating user");
  }
  return true;
};

const validateName = (name: Date | string | number) => {
  if (name === "") {
    return false;
  }
  if (String(name).length > 50) {
    return false;
  }
  return true;
};

const validateAge = (age: number | string | Date) => {
  if (Number(age) < 18) {
    return false;
  }
  return true;
};

const validateAddress = (address: Date | string | number) => {
  if (address === "") {
    return false;
  }
  if (String(address).length >200) {
    return false;
  }
  return true;
};

const validateMobile = (inputValue: Date | string | number) => {
  try {
    const phoneNumberObj = parsePhoneNumber(String(inputValue));
    return phoneNumberObj!.isValid();
  } catch (error) {
    if (inputValue === undefined || inputValue === null || inputValue === "") {
      return false;
    }
    if (
      String(inputValue).length === 10 &&
      String(inputValue).startsWith("0") &&
      /^\d+$/.test(String(inputValue))
    ) {
      return true;
    }
    return false;
  }
};

const validateBirthday = (birthday: Date | string | number) => {
  if (birthday === null) {
    return false;
  }
  return true;
};

export {
  isEmptyFields,
  validateUser,
  validateName,
  validateAge,
  validateMobile,
  validateAddress,
  validateBirthday,
};
