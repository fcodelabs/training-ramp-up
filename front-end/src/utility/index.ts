export function calculateAge(birthdate: any): number {
  const dateOfbirth = new Date(birthdate);
  const today = new Date();
  let age = today.getFullYear() - dateOfbirth.getFullYear();
  const monthDifference = today.getMonth() - dateOfbirth.getMonth();

  if (
    monthDifference < 0 ||
    (monthDifference === 0 && today.getDate() < dateOfbirth.getDate())
  ) {
    age--;
  }

  return age;
}

export function validateMobileNumber(number: string): boolean {
  const pattern = /^(\+)?[0-9]+$/;
  return pattern.test(number);
}

export function validateEmail(email: string): boolean {
  const pattern = /\S+@\S+\.\S+/;
  return pattern.test(email);
}

export function validatePassword(password: string): boolean {
  const hasValidLength = password.length >= 8;

  // At least one lowercase letter (a-z)
  const hasLowerCase = /[a-z]/.test(password);

  // At least one uppercase letter (A-Z)
  const hasUpperCase = /[A-Z]/.test(password);

  // At least one number (0-9)
  const hasNumber = /[0-9]/.test(password);

  // At least one special character
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/.test(
    password
  );

  return (
    hasValidLength &&
    hasLowerCase &&
    hasUpperCase &&
    hasNumber &&
    hasSpecialChar
  );
}
