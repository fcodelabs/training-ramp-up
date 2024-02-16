function validateMobileNumber(number: string): boolean {
    const pattern = /^(\+)?[0-9]+$/;
    return pattern.test(number);
  }
export default validateMobileNumber;  