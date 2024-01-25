const validatePhoneNumber = (value: string): boolean => {
  // Regular expression for validating phone numbers
  const phoneNumberRegex = /^0[0-9]*$/;

  // Check if the value matches the regex
  return phoneNumberRegex.test(value) && value.length <= 10;
};

export default validatePhoneNumber;
