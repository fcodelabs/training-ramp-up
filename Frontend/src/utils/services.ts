import { toast } from "react-toastify";
import { Student } from "./interface";

export const calcAge = (date: Date) => {
  const today = new Date();
  const birthDate = new Date(date);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  if (age < 18) {
    toast.error("Age should be greater than 18");
    return false;
  }
  return age;
};

const isPhonenumber = (number: string) => {
  const phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
  if (number.match(phoneno)) {
    return true;
  } else {
    toast.error("Please enter valid phone number");
    return false;
  }
};

const isAddress = (address: string) => {
  const adrs = /^[a-zA-Z0-9\s,'./-]*$/;
  if (address.match(adrs)) {
    return true;
  } else {
    toast.error("Please enter valid address");
    return false;
  }
};

export const Validate = (data: Student) => {
  if (
    data.name &&
    data.address &&
    data.gender &&
    data.birthday &&
    data.mobile
  ) {
    if (
      isAddress(data.address) &&
      isPhonenumber(data.mobile) &&
      calcAge(data.birthday)
    ) {
      return true;
    } else {
      return false;
    }
  } else {
    toast.error("Please fill all the fields");
    return false;
  }
};
