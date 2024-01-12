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

export const ageCalculator = (dateOfBirth: any) => {
  const dateOfbirth = new Date(dateOfBirth);

  const today = new Date();
  const age =
    today.getFullYear() -
    dateOfbirth.getFullYear() -
    (today.getMonth() < dateOfbirth.getMonth() ||
    (today.getMonth() === dateOfbirth.getMonth() &&
      today.getDate() < dateOfbirth.getDate())
      ? 1
      : 0);
  return age;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  let cleanNumber = phoneNumber.replace(/\D/g, "");
  if (cleanNumber.length >= 10) {
    cleanNumber = "0" + cleanNumber.slice(-9);
  }
  return `${cleanNumber.slice(0, 3)}-${cleanNumber.slice(
    3,
    6
  )}-${cleanNumber.slice(6)}`;
};
