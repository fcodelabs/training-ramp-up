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
