export const validatePhoneNumber = (phoneNumber: string) => {
  if (
    phoneNumber.startsWith("+") &&
    phoneNumber.length === 12 &&
    phoneNumber.slice(1).match(/^\d+$/)
  ) {
    return true;
  } else if (
    !phoneNumber.startsWith("+") &&
    phoneNumber.length === 10 &&
    phoneNumber.match(/^\d+$/)
  ) {
    return true;
  } else {
    console.error("Please enter a valid phone number.");
    return false;
  }
};
