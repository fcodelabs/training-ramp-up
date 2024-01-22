const validateMobile = (value: string) => {
  const mobileRegex = /^\+?\d{10}$/;
  return mobileRegex.test(value);
};

export default validateMobile;
