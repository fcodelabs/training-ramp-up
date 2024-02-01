const isPasswordValid = (password: string): boolean => {
  // Check if the password contains a lowercase character
  const hasLowercase = /[a-z]/.test(password);

  // Check if the password contains an uppercase character
  const hasUppercase = /[A-Z]/.test(password);

  // Check if the password contains a special character
  const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);

  // Check if the password contains a number
  const hasNumber = /\d/.test(password);

  // Check if the password has a minimum of 8 characters
  const hasMinimumLength = password.length >= 8;

  console.log(
    hasLowercase,
    hasUppercase,
    hasSpecialCharacter,
    hasNumber,
    hasMinimumLength
  );
  // Return true if all conditions are met, otherwise false
  return (
    hasLowercase &&
    hasUppercase &&
    hasSpecialCharacter &&
    hasNumber &&
    hasMinimumLength
  );
};

export default isPasswordValid;
