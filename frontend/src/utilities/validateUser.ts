const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
const isValidName = (name: string) => {
    return name.length > 0 && name.length <= 50;
}

const isValidPassword = (password: string) => {
    return password.length >= 8;
}


export { isValidEmail, isValidName, isValidPassword };