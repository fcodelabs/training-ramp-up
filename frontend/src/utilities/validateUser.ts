const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email === "" || emailRegex.test(email);
};
const isValidName = (name: string) => {
  return name.length >= 0 && name.length <= 50;
};

const validatePassword = (inputPassword: string) => {
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;
  return passwordRegex.test(inputPassword) || inputPassword.length === 0;
};

export { isValidEmail, isValidName, validatePassword };
