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
