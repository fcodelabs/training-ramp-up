const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const isValidName = (name: string) => {
    return name.length > 0 && name.length <= 50;
}



const validatePassword = (inputPassword: any) => {
    const lowercaseRegex = /[a-z]/;
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    const numberRegex = /[0-9]/;

    const isLowerCase = lowercaseRegex.test(inputPassword);
    const isUpperCase = uppercaseRegex.test(inputPassword);
    const isSpecialChar = specialCharRegex.test(inputPassword);
    const isNumber = numberRegex.test(inputPassword);
    const isMinLength = inputPassword.length >= 8;

    if (
      inputPassword!="" &&
      isLowerCase &&
      isUpperCase &&
      isSpecialChar &&
      isNumber &&
      isMinLength
    ) {
      return true;
    } else {
      return false;
    }
  };


export { isValidEmail, isValidName, validatePassword };